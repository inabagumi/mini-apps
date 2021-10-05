const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/** @type {import('@prisma/client').Prisma.QuestionCreateInput[]} */
const questionData = [
  {
    answers: {
      create: [
        {
          value: 'ショッピング'
        },
        {
          value: '勉強'
        },
        {
          value: 'ゲーム'
        },
        {
          value: '睡眠'
        }
      ]
    },
    title: '休日はなにをして過ごす?'
  },
  {
    answers: {
      create: [
        {
          value: '中華料理'
        },
        {
          value: 'イタリアン'
        },
        {
          value: 'フレンチ'
        },
        {
          value: '和食'
        }
      ]
    },
    title: 'あなたが好きな食べ物は?'
  },
  {
    answers: {
      create: [
        {
          value: 'STEINS;GATE'
        },
        {
          value: '魔法少女まどか☆マギカ'
        },
        {
          value: '新世界より'
        },
        {
          value: '君の名は。'
        }
      ]
    },
    title: 'あなたが好きなアニメは?'
  },
  {
    answers: {
      create: [
        {
          value: '銀と金'
        },
        {
          value: '7SEEDS'
        },
        {
          value: '闇金ウシジマくん'
        },
        {
          value: 'SLAM DUNK'
        }
      ]
    },
    title: 'あなたが好きなマンガは?'
  },
  {
    answers: {
      create: [
        {
          value: 'メガネ'
        },
        {
          value: '黒スト'
        },
        {
          value: 'うさぎ耳'
        },
        {
          value: '清楚'
        }
      ]
    },
    title: 'あなたが好きな異性のタイプは?'
  },
  {
    answers: {
      create: [
        {
          value: '好き'
        },
        {
          value: '好き'
        },
        {
          value: '好き'
        },
        {
          value: '好き'
        }
      ]
    },
    title: 'ねるちゃんが……'
  }
]

/** @type {import('@prisma/client').Prisma.TalentCreateInput[]} */
const talentData = [
  {
    name: '因幡はねる',
    twitter: 'Haneru_Inaba',
    youtube: 'UC0Owc36U9lOyi9Gx9Ic-4qg'
  }
]

/** @type {import('@prisma/client').Prisma.ResultCreateInput[]} */
const resultData = [
  {
    attribute: 'メイド',
    catchphrase: 'おかえりなさいませ♪ご主人さま！',
    parameters: [
      {
        label: 'メイド',
        value: 1.05
      },
      {
        label: 'お料理',
        value: 0.83
      },
      {
        label: '清楚',
        value: 0.61
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/5iLMsnNWuxY'
      }
    },
    slug: '3bXvK25U',
    type: 'お料理'
  },
  {
    attribute: '先生',
    catchphrase: '美人 先生',
    parameters: [
      {
        label: '先生',
        value: 1.05
      },
      {
        label: 'メガネ',
        value: 0.64
      },
      {
        label: '色気',
        value: 0.28
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/46zn0VIqJ1g'
      }
    },
    slug: '3bXvK25U',
    type: 'メガネ'
  },
  {
    attribute: '書家',
    catchphrase: '新元号令和を最速書道した女！',
    parameters: [
      {
        label: '書家',
        value: 1.05
      },
      {
        label: '速度',
        value: 0.84
      },
      {
        label: '達筆度',
        value: 0.74
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/qjkvwHvqWk0'
      }
    },
    slug: 'DAltKHae',
    type: '最速'
  },
  {
    attribute: 'うさぎ',
    catchphrase: '“ALWAYS WATCHING YOU”',
    parameters: [
      {
        label: 'うさぎ',
        value: 1.05
      },
      {
        label: '清楚',
        value: 0.64
      },
      {
        label: 'かわいさ',
        value: 0.34
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/UxBN_XsU0tU'
      }
    },
    slug: 'hUuAaZpw',
    type: '清楚'
  },
  {
    attribute: 'ゲーマー',
    catchphrase: 'おかえりなさいませ♪ご主人さま！',
    parameters: [
      {
        label: '努力',
        value: 1.05
      },
      {
        label: 'ゲーマー',
        value: 0.32
      },
      {
        label: '無邪気さ',
        value: 0.12
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/TzdMmvzYtCQ'
      }
    },
    slug: 'jk54nVLu',
    type: '努力'
  },
  {
    attribute: '店員',
    catchphrase: 'たくさん注文ありがと～♡♡',
    parameters: [
      {
        label: '料理上手',
        value: 1.05
      },
      {
        label: 'ウェートレス',
        value: 0.75
      },
      {
        label: '献身さ',
        value: 0.53
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/3M7qAnXcuJI'
      }
    },
    slug: 'kJN5x4Vl',
    type: '料理上手'
  },
  {
    attribute: 'うさぎ',
    catchphrase: 'ねるちゃんですよ～！',
    parameters: [
      {
        label: 'うさぎ',
        value: 1.05
      },
      {
        label: '3D',
        value: 0.89
      },
      {
        label: '努力',
        value: 0.54
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/cjoo08sI76w'
      }
    },
    slug: 'rKAeiUil',
    type: '3D'
  },
  {
    attribute: '彼女',
    catchphrase: 'イルミネーションを見にいこっか～！',
    parameters: [
      {
        label: '彼女',
        value: 1.05
      },
      {
        label: 'サンタ',
        value: 0.38
      },
      {
        label: '真摯度',
        value: 0.24
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/eyNz8J_RIJ8'
      }
    },
    slug: 'sJEfGEiw',
    type: 'サンタ'
  },
  {
    attribute: 'アナ',
    catchphrase: 'ねるにゅ～の時間ですよー！',
    parameters: [
      {
        label: 'アナウンサー',
        value: 1.05
      },
      {
        label: '知性',
        value: 0.45
      },
      {
        label: 'かわいさ',
        value: 0.28
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/Cdf1PF6i_Zw'
      }
    },
    slug: 'Tm3fKyEP',
    type: '知性派'
  },
  {
    attribute: '彼女',
    catchphrase: '今日は私と花火大会デートしよっか？',
    parameters: [
      {
        label: '彼女',
        value: 1.05
      },
      {
        label: '浴衣',
        value: 0.74
      },
      {
        label: 'かわいさ',
        value: 0.68
      }
    ],
    recommendedVideo: {
      create: {
        url: 'https://youtu.be/y6uNpxyqxL8'
      }
    },
    slug: 'xGr4nzdz',
    type: '浴衣'
  }
]

async function main() {
  console.log('Start seeding ...')

  await Promise.allSettled([
    ...questionData.map((data) => prisma.question.create({ data })),
    ...talentData.map((data) => prisma.talent.create({ data }))
  ])

  const talent = await prisma.talent.findFirst({
    where: {
      name: '因幡はねる'
    }
  })

  await Promise.allSettled(
    resultData.map((data) =>
      prisma.result.create({
        data: {
          ...data,
          talent: {
            connect: {
              id: talent.id
            }
          }
        }
      })
    )
  )

  console.log('Seeding finished.')
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect()
  })
