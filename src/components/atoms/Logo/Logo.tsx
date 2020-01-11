import clsx from 'clsx'
import React, { FC, SVGProps } from 'react'
import css from 'styled-jsx/css'
import HorizontalLogo from '../../../assets/logo.svg'
import VerticalLogo from '../../../assets/vertical-logo.svg'

const { className, styles } = css.resolve`
  .logo {
    display: inline-block;
    fill: currentColor;
    height: 1em;
    line-height: 1;
    vertical-align: middle;
    width: auto;
  }

  .logo--vertical {
    height: auto;
    width: 1em;
  }
`

type Props = {
  vertical?: boolean
} & SVGProps<SVGSVGElement>

const Logo: FC<Props> = ({ vertical = false, ...props }) => {
  const RawLogo = vertical ? VerticalLogo : HorizontalLogo

  return (
    <>
      <RawLogo
        {...props}
        className={clsx('logo', className, props.className, {
          'logo--vertical': vertical
        })}
      />

      {styles}
    </>
  )
}

export default Logo
