import Head from "next/head";
import { useEffect } from "react";
import { useStateContext } from "../components/HBOProvider";
import { useRouter } from "next/router";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../components/UI/MediaRow/MediaRow";
import AuthCheck from "../components/AuthCheck";
import LazyLoad from "react-lazyload";
import PlaceHolders from "../components/UI/Placeholders/PlaceHolders";

export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();
  useEffect(() => {}, []);
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        mediaUrl="https://www.youtube.com/embed/NYH2sLid0Zc?autoplay=1&loop=1&start=16"
        title="Mortal Kombat"
        location="text"
        linkUrl="/movie/460465"
        type="front"
      />
      <LazyLoad
        offset={-400}
        placeholder={<PlaceHolders title="Movies" type="large-v" />}
      >
        <MediaRow
          title="Movies"
          type="large-v"
          endpoint="discover/movie?sort_by=popularity.desc&primary_release_year=2021"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<PlaceHolders title="Movies" type="small-h" />}
      >
        <MediaRow
          title="Series"
          type="small-h"
          endpoint="discover/tv?primary_release_year=2021"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<PlaceHolders title="Movies" type="small-v" />}
      >
        <MediaRow
          title="Action"
          type="small-v"
          endpoint="discover/movie?with_genres=28&primary_release_year=2021"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<PlaceHolders title="Movies" type="large-v" />}
      >
        <MediaRow
          title="Horror"
          type="large-v"
          endpoint="discover/movie?with_genres=27&primary_release_year=2021"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<PlaceHolders title="Movies" type="large-v" />}
      >
        <MediaRow
          title="Animations"
          type="large-h"
          endpoint="discover/movie?with_genres=16&primary_release_year=2021"
        />
      </LazyLoad>

      <LazyLoad
        offset={-400}
        placeholder={<PlaceHolders title="Movies" type="small-v" />}
      >
        <MediaRow
          title="Scifi"
          type="small-v"
          endpoint="discover/movie?with_genres=878&primary_release_year=2021"
        />
      </LazyLoad>
    </MainLayout>
  );
}
