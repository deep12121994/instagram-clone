import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../App'

const Profile = () => {

    const [myPics, setMyPics] = useState([]);
    const {state,dispatch} = useContext(UserContext);

    console.log(state)

    useEffect(() => {
        let unmounted = false;
        fetch('/mypost',{
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            //console.log(result)
            if(!unmounted)
                setMyPics(result.mypost)
            //console.log(myPics)
        })
        
        return () => {
            unmounted = true;
        }
    },[])
    
    return (
        <div style={{
            maxWidth:"550px",
            margin: "0px auto"
        }}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom: "1px solid grey"
            }}>
                
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                        src = {state ? state.pic : "loading..."}
                        alt="user image"/>
                </div>

                <div>
                    <h4>{state ? state.name : "loading.."}</h4>
                    <h5>{state ? state.email : "loading.."}</h5>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"108%"
                    }}>
                        <h6>{myPics.length} Posts</h6>
                        <h6>{state ? state.followers.length : "0"} followers</h6>
                        <h6>{state ? state.following.length : "0"} following</h6>
                    </div>
                </div>
            </div>         
            <div className="gallery">
                {
                    myPics.map(item => {
                        return(
                            <img key={item._id} src={item.photo} alt={item.title} className="image-item"/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;