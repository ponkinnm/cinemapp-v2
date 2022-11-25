import {Outlet, Link} from "react-router-dom";

function Layout() {
    return (
        <>


            <Outlet/>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="test">Test</Link>
                    </li>
                    <li>
                        he
                    </li>
                </ul>
            </nav>
        </>
    )
};

export default Layout;