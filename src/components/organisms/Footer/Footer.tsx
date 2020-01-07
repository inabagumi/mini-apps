import Link from 'next/link'
import React, { FC } from 'react'

const Footer: FC = () => {
  return (
    <>
      <footer className="footer">
        <p className="copyright">
          &copy; 2020{' '}
          <a
            href="https://haneru.dev/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Haneru Developers
          </a>
        </p>

        <nav className="footer__navigation">
          <ul>
            <li>
              <Link href="/privacy" prefetch={false}>
                <a href="/privacy">プライバシーポリシー</a>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>

      <style jsx>{`
        .copyright {
          margin: 0;
        }

        .copyright a {
          color: inherit;
          text-decoration: none;
        }

        .copyright a:hover {
          text-decoration: underline;
        }

        .footer {
          align-items: flex-start;
          color: #eee;
          display: flex;
          flex-direction: column;
          font-size: 0.85rem;
          justify-content: space-between;
          padding: 2rem 1rem 0.5rem;
        }

        @media (min-width: 960px) {
          .footer {
            flex-direction: row;
          }
        }

        .footer__navigation ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  )
}

export default Footer
