import { Navigation } from '@elements'
import { BoostPage, CustomizePage, GamePage, HomePage, LeaderboardPage, LoaderPage, OnboardingPage, QrCodePage, QuestsPage, ReferralsPage, StreakPage } from '@pages'
import { useAuth, useTelegram } from '@providers'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

type PageWrapperProps = {
    hideNavbar?: boolean
}

const PageWrapper: FC<PropsWithChildren<PageWrapperProps>> = ({children, hideNavbar}) => {
    return (
        <>
        <section className={'content'}>
            {children}
        </section>
        {
            hideNavbar ? null : <Navigation/>
        }
        </>
    )
}

const AppRouter: FC = () => {
    
    const { pathname } = useLocation()
    const { initData, isMobile } = useTelegram()
    const { isAuthorized, isFirstTimeLogin } = useAuth()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!isAuthorized) return
        const to = setTimeout(() => setIsLoaded(true), 1500)
        return () => clearTimeout(to)
    }, [isAuthorized])

    useEffect(() => {
        const timeout = setTimeout(() => window.scrollTo({
            behavior: "smooth",
            left: 0,
            top: -1
        }), 10)
        return () => clearTimeout(timeout)
    }, [pathname])

    if (initData === null) return (
        <>
            <section className='page'>
            <Routes>
                <Route path='/' element={<PageWrapper hideNavbar><QrCodePage/></PageWrapper>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
            </section>
        </>
    )

    if (!isAuthorized || !isLoaded) return (
        <>
            <section className='page'>
            <Routes>
                <Route path='/' element={<PageWrapper hideNavbar><LoaderPage/></PageWrapper>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
            </section>
        </>
    )

    return (
    <>
      <section className='page'>
        <Routes>
            <Route path='/home' element={<PageWrapper><HomePage/></PageWrapper>}/>
            <Route path='/referrals' element={<PageWrapper><ReferralsPage/></PageWrapper>}/>
            <Route path='/quests' element={<PageWrapper><QuestsPage/></PageWrapper>}/>
            <Route path='/boost' element={<PageWrapper><BoostPage/></PageWrapper>}/>
            <Route path='/customize' element={<PageWrapper><CustomizePage/></PageWrapper>}/>
            <Route path='/streak' element={<PageWrapper hideNavbar><StreakPage/></PageWrapper>}/>
            <Route path='/leaderboard' element={<PageWrapper><LeaderboardPage/></PageWrapper>}/>
            {
                isMobile
                ?
                <Route path='/game' element={<PageWrapper hideNavbar><GamePage/></PageWrapper>}/>
                :
                <Route path='/game' element={<PageWrapper><QrCodePage/></PageWrapper>}/>
            }
            {
                isFirstTimeLogin
                ?
                <>
                <Route path='/onboarding' element={<PageWrapper hideNavbar><OnboardingPage/></PageWrapper>}/>
                <Route path='*' element={<Navigate to='/onboarding'/>}/>
                </>
                :
                <Route path='*' element={<Navigate to='/streak'/>}/>
            }
        </Routes>
      </section>
    </>
    )
}

export default AppRouter