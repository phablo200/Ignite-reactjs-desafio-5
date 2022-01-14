import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
          <title>Posts</title>
      </Head>

      <main className={styles.container}>
          <div className={styles.posts}>
              {
                  postsPagination.results.map(post => (
                      <div className={styles.postBody}>
                        <Link href={`/post/${post.uid}`} key={post.uid}>
                          <a>
                              <strong>{post.data.title}</strong>
                              <p>
                                  {post.data.subtitle}
                              </p>
                          </a>
                        </Link>

                        <div className={styles.postFooter}>
                          <span>{post.data.author}</span>
                          <span>{post.first_publication_date}</span>
                        </div>
                      </div>
                  ))
              }
          </div>

          <div className={styles.footer}>

            {
              postsPagination.next_page && (
                <button>
                  Carregar mais posts
                </button>
              )
            }
          </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query('');

  return {
    props: {
      postsPagination: {
        next_page: response.next_page,
        results: response.results
      }
    }
  };
};
