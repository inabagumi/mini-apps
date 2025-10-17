'use client'

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className="title">774 ink.</h1>
        <p className="message">
          <span className="label">もしかして:&nbsp;</span>
          <a
            className="link"
            href="https://774.ai/"
            rel="noopener noreferrer"
            target="_blank"
          >
            774 inc.
          </a>
        </p>
      </div>

      <style jsx>{`
        .container {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: center;
          padding: 1rem;
          width: 100vw;
        }

        .title {
          display: none;
        }

        .message {
          font-size: 3rem;
          font-weight: 700;
        }

        @media (max-width: 500px) {
          .label,
          .link {
            display: block;
          }
        }
      `}</style>
    </>
  )
}
