
import { client } from '../utils/prismicPosts';
import Post from '../components/Post';
import Prismic from 'prismic-javascript'

const Home = ({posts}) => {

  return (
      <>
        <h1>Dandelion Blog</h1>
        <div className="posts">
          {posts !== undefined &&
              posts.map((p) => {
                let title = p.title[0].text
                let key = `${p.date}+${title}`
                return <Post key={key} date={p.date} image={p.image} title={title} />
              })}
        </div>
      </>

  )
}
export default Home;



// at the bottom of your component file
export async function getStaticProps() {
  // query() is empty on purpose!
  // https://prismic.io/docs/rest-api/query-the-api/query-all-documents
/*  const res = await client.query('')*/
    const res = await client.query(
        Prismic.Predicates.at('document.type', 'article'),// Получение данных из призмик по типу
        {
            orderings: `[document.date desc]`,// сортировка по дате, сначала новые
            pageSize: 1,//1 статья на странице
            page: 1// загружается сначала 2я страница
        })

  const posts = res.results.map((p) => {
    return p.data
  })

  return {
    props: {
      posts,
    },
  }
}
