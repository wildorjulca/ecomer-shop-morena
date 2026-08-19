import HomeCategories from '@/components/shop/home/HomeCategories'
import HomeFootwearBrandShowcase from '@/components/shop/home/HomeFootwearBrandShowcase'
import HeroSlideShow from '@/components/shop/slideshow/HeroSlideShow'
import Image from 'next/image'
import HomeOffersSlideshow from '@/components/shop/home/HomeOffersSlideshow'
import HomeAccesorioSlideshow from '@/components/shop/home/HomeAccesorioSlideshow'
import HomeFootwearAccesorioShowcase from '@/components/shop/home/HomeFootwearAccesorioShowcase'

const page = () => {
    return (
        <div className='container mx-auto flex flex-col justify-center items-center'>
            <HeroSlideShow />

            <div className='max-w-[1200px] mx-auto flex flex-col flex-1 w-full'>
                <HomeCategories />
                <div className='w-full relative h-[200px] mt-8'>
                    <Image
                        alt='propaganda'
                        src={'/images/propaganda/acxSvpGXnQHGZJeb_pe-dsk-inf1-bth-sneakerheads-230326.webp'}
                        fill
                        className='object-contain'
                    />

                </div>
                <div className="w-full flex gap-2.5">
                    <div className="w-1/2 relative h-[150px]">
                        <Image
                            alt="propaganda"
                            src="/images/propaganda/ac1RqJGXnQHGZLRw_pe-dsk-inf1-bth-carteras-010426.webp"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="w-1/2 relative h-[150px]">
                        <Image
                            alt="propaganda"
                            src="/images/propaganda/acxfk5GXnQHGZJji_pe-dsk-inf2-bth-relojes-010426.webp"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <HomeFootwearBrandShowcase />
                <HomeAccesorioSlideshow />
                <HomeFootwearAccesorioShowcase />
                <HomeOffersSlideshow />

            </div>

        </div>
    )
}

export default page