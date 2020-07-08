import React from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../global/gloablState'

const Home = ({history}) => {

    const user = useRecoilValue(userAtom)

    const handleCTA = () => {
        if(user){
            history.push('/dashboard')
        }else{
            history.push('/signup')
        }
    }

    return (
        <div className="Home">
            <div className="header">

                <div className="left">
                    <h1>Welcome to stockify</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta necessitatibus asperiores fuga iste, maiores nisi veritatis fugiat sunt mollitia dolorem.</p>
                    <button onClick={() => handleCTA()} className="cta rev">{user ? "Go to dashboard" : "Get Started"}</button>
                </div>

                <div className="right">
                    <img src={require("../assets/home_back.png")} alt="" />
                </div>
            </div>
            <div className="divider"></div>
            <div className="main-body">
                <div className="features">
                    <h1>Features</h1>
                    <div className="items">
                        <div className="item">
                            <img src="https://via.placeholder.com/300" alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, enim.</p>
                        </div>
                        <div className="item">
                            <img src="https://via.placeholder.com/300" alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, enim.</p>
                        </div>
                        <div className="item">
                            <img src="https://via.placeholder.com/300" alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, enim.</p>
                        </div>
                    </div>
                </div>

                <div className="about-us">
                    <h1>About Us</h1>
                    <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit exercitationem quibusdam sapiente sint dolor doloremque cum incidunt iusto, quod eveniet deleniti explicabo repellendus earum rem voluptates ipsam officia magni perspiciatis.</p>
                    <div className="items">
                        <div className="item">
                            <img src="https://via.placeholder.com/300" alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, enim.</p>
                        </div>
                        <div className="item">
                            <img src="https://via.placeholder.com/300" alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, enim.</p>
                        </div>
                        <div className="item">
                            <img src="https://via.placeholder.com/300" alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, enim.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
