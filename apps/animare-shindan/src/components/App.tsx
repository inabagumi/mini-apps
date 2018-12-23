import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import { default as styled, createGlobalStyle } from 'styled-components'
import { default as Loading } from './Loading'

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #0588f7;
    background-image:
      repeating-linear-gradient(
        150deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05) 9px,
        transparent 10px,
        transparent 19px
      );
    font-family: Noto Sans JP, sans-serif;
    font-size: 10px;
    font-weight: 700;
    height: 100%;
    line-height: 1.8;
  }

  body {
    font-size: 1.5rem;
    height: 100%;
    margin: 0;
  }
`

const Content = styled.div`
  padding: 0 20px;

  @media (min-width: 500px) {
    box-sizing: border-box;
    min-height: 100vh;
    padding: 0;
    position: relative;
  }
`

const Home = React.lazy(() =>
  import(/* webpackChunkName: 'pages/home' */ '../pages/Home')
)
const List = React.lazy(() =>
  import(/* webpackChunkName: 'pages/list' */ '../pages/List')
)
const Questions = React.lazy(() =>
  import(/* webpackChunkName: 'pages/questions' */ '../pages/Questions')
)

export default function App() {
  return (
    <>
      <Helmet defer={false} titleTemplate="%s | #あにまーれオタクタイプ診断">
        <html lang="ja" />
        <title>あなたのオタクタイプ診断 by あにまーれ</title>
        <meta charSet="UTF-8" />
        <meta content="width=device-width" name="viewport" />
        <link href="/assets/icon-128x128.png" rel="icon" />
        <link href="/manifest.json" rel="manifest" />
        <link
          as="style"
          href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400:700,900"
          rel="preload"
        />
        <link
          as="style"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="preload"
        />
      </Helmet>

      <GlobalStyle />

      <svg style={{ display: 'none' }}>
        <defs>
          <symbol id="nanashi" viewBox="0 0 2560 2560">
            <path d="M434 2483c9-114 23-214 35-251 11-37 55-94 65-85 3 4 6 1 6-5 0-7 11-12 24-12 14 0 27-4 30-9 3-4 21-11 39-14 19-3 54-14 78-25 25-11 58-22 74-24 52-6 173-50 199-73 13-12 28-34 32-51 15-63 72-144 101-144 8 0 13-13 13-37 0-34-5-41-48-68-26-16-71-55-100-87-47-52-52-55-52-33 0 37-12 31-39-20-15-29-27-42-32-34-4 8-20-3-45-31-22-23-40-46-42-51s-9-9-17-9c-15 0-92-180-111-260-30-121-8-319 50-455 12-28 14-46 7-65-45-125-39-375 15-612 10-43 50-38 99 12 21 22 42 40 46 40 3 0 26 18 50 41 24 22 57 47 73 56 36 19 48 28 97 74l38 36 83-15c69-13 97-13 165-3 46 6 88 14 95 16 7 3 24-11 38-29 14-19 27-34 30-33a943 943 0 0 0 236-175c68-63 97-65 112-5l16 72 16 90c17 89 8 381-13 421-15 29-15 34 9 93 14 34 32 92 39 129 19 89 19 275 0 337-21 72-98 244-106 239-7-4-69 60-88 92-8 15-12 16-20 6-6-10-13-3-27 27-23 49-50 56-40 10 5-29 3-27-38 23-42 51-93 101-99 95-1-1-15 8-30 19-39 31-38 83 2 107 35 21 66 69 75 117 7 38 41 80 66 80 9 0 20 4 25 9 14 12 152 60 158 54 3-2 18 2 34 10 16 9 57 23 92 32 87 22 136 45 151 69 25 40 42 130 56 304l7 82H427l7-77z" />
          </symbol>
        </defs>
      </svg>

      <Content>
        <Switch>
          <Route exact path="/">
            <React.Suspense fallback={<Loading />}>
              <Home />
            </React.Suspense>
          </Route>
          <Route path="/list">
            <>
              <Helmet defer={false}>
                <title>お知らせ</title>
              </Helmet>

              <React.Suspense fallback={<Loading />}>
                <List />
              </React.Suspense>
            </>
          </Route>
          <Route path="/questions">
            <>
              <Helmet defer={false}>
                <title>診断中</title>
              </Helmet>

              <React.Suspense fallback={<Loading />}>
                <Questions />
              </React.Suspense>
            </>
          </Route>
        </Switch>
      </Content>

      <link
        href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400:700,900"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </>
  )
}
