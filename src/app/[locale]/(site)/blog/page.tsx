import HeroSub from '@/components/SharedComponent/HeroSub'
import UnderConstruction from '@/components/SharedComponent/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
}

const BlogPage = () => {
  return (
    <>
      <HeroSub
        title='Blog'
        description='Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends.'
      />
      <UnderConstruction
        title='Coming Soon'
        message='Our blog is under construction. We are preparing interesting articles for you — stay tuned!'
      />
    </>
  )
}

export default BlogPage
