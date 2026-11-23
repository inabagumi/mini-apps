// The parameters of a result ("オタクパラメーター"), which are shown as a bar
// graph on the result page.
//
// The parameters are stored as JSON in the `parameters` column of the
// `results` table: an array of `{ "label": string, "value": number }`. The
// order of the array is the order of the graph, and the first parameter is
// highlighted as the main one.
//
// The value is a ratio where 1 means 100%, which is the full length of the bar
// graph. A value may exceed 100% (up to {@link MAX_PARAMETER_VALUE}) to
// emphasize the parameter, as in "105%", and its bar overflows the graph.
//
// This module has no dependencies on the database or the UI, so that it can
// be tested on its own.

/** The lowest value of a parameter (0%). */
export const MIN_PARAMETER_VALUE = 0;

/** The highest value of a parameter (150%). */
export const MAX_PARAMETER_VALUE = 1.5;

export interface ResultParameter {
  /** The label of the parameter, which is unique in the result. */
  label: string;
  /**
   * The ratio from {@link MIN_PARAMETER_VALUE} to {@link MAX_PARAMETER_VALUE},
   * where 1 means 100%.
   */
  value: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Whether the label is a string that is not empty or only whitespace. */
export const isValidParameterLabel = (label: unknown): label is string =>
  typeof label === "string" && label.trim() !== "";

/**
 * Whether the value is a finite number from {@link MIN_PARAMETER_VALUE} to
 * {@link MAX_PARAMETER_VALUE}.
 */
export const isValidParameterValue = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value >= MIN_PARAMETER_VALUE &&
  value <= MAX_PARAMETER_VALUE;

/**
 * Returns the problems of the parameters: a value that is not an array,
 * entries that are not `{ label, value }` objects, empty labels, values out of
 * range, and duplicate labels.
 */
export const findParameterProblems = (parameters: unknown): string[] => {
  if (!Array.isArray(parameters)) {
    return ["The parameters are not an array"];
  }

  const problems: string[] = [];
  const labels = new Set<string>();

  for (const [i, parameter] of parameters.entries()) {
    if (!isRecord(parameter)) {
      problems.push(`Parameter ${i} is not an object`);
      continue;
    }

    const { label, value } = parameter;

    if (!isValidParameterLabel(label)) {
      problems.push(`Parameter ${i} has an invalid label`);
    } else if (labels.has(label)) {
      problems.push(`Parameter ${i} has a duplicate label: ${label}`);
    } else {
      labels.add(label);
    }

    if (!isValidParameterValue(value)) {
      problems.push(`Parameter ${i} has an invalid value: ${String(value)}`);
    }
  }

  return problems;
};

/**
 * Reads the parameters from the JSON stored in the database.
 *
 * Invalid entries (see {@link findParameterProblems}) are skipped instead of
 * breaking the page, and so are the entries whose label is the same as an
 * earlier one. A value that is not an array gives no parameters.
 */
export const parseParameters = (json: unknown): ResultParameter[] => {
  if (!Array.isArray(json)) {
    return [];
  }

  const parameters: ResultParameter[] = [];
  const labels = new Set<string>();

  for (const parameter of json) {
    if (
      isRecord(parameter) &&
      isValidParameterLabel(parameter.label) &&
      isValidParameterValue(parameter.value) &&
      !labels.has(parameter.label)
    ) {
      labels.add(parameter.label);
      parameters.push({ label: parameter.label, value: parameter.value });
    }
  }

  return parameters;
};

/**
 * Returns the length of the bar for the value relative to the graph, where 1
 * is the full length. A value over 100% gives a ratio over 1, which overflows
 * the graph. The ratio is clamped from {@link MIN_PARAMETER_VALUE} to
 * {@link MAX_PARAMETER_VALUE}, and an invalid value gives 0.
 */
export const getParameterBarRatio = (value: number): number => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(Math.max(value, MIN_PARAMETER_VALUE), MAX_PARAMETER_VALUE);
};

/** Formats the value as a percentage rounded to an integer, such as "105%". */
export const formatParameterValue = (value: number): string =>
  `${Math.round(value * 100)}%`;
