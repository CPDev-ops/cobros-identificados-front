import { Route, Routes } from 'react-router-dom'
import RedirectModule from '../core/pages/Redirect'
import PageHome from '../core/pages/home/page'



export const RouterContainer = () => {
    return (
        <div className='tracking-wider gothamMedium'>
            <Routes>
                <Route path='/' element={<RedirectModule route='/home' />} />
                <Route path='/home' element={<PageHome />} />
            </Routes>
        </div>
    )
}

