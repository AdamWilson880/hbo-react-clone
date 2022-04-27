import Head from 'next/head'
import {useEffect, useState} from 'react'
import AuthCheck from '../../components/AuthCheck'
import MainLayout from'../../components/Layouts/MainLayout'
import CastInfo from'../../components/UI/CastInfo/CastInfo'
import FeaturedMedia from '../../components/UI/FeaturedMedia/FeaturedMedia'
import MediaRow from '../../components/UI/MediaRow/MediaRow'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function SingleMediaPage(props) {
  const router = useRouter()
  const [mediaData, setMediaData] = useState(false);
  // const { id } = router.query
  console.log(props)
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${props.query.id}?api_key=f40103be50cc9b93a331d8f0f2eeb811&language=en-US`)
      .then(function (response) {
        setMediaData(response.data)
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log('Error Response For ');
        console.log(error);
      }) 
  }, []);

  
  return AuthCheck(
    <MainLayout>
      <h1 style={{color: 'white'}}>${props.query.id}</h1>
      <FeaturedMedia title={mediaData.title} />
      {/* <MediaRow title="More Like This" type="small-v" /> */}
      <CastInfo />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {query: context.query}, // will be passed to the page component as props
  }
}