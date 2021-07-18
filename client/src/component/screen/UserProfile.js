import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../App';
import {useParams} from 'react-router-dom';

const Profile = () => {

    const [userProfile,setProfile] = useState();
    const [myPics, setMyPics] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    const {userid} = useParams();
    //console.log(userid)
    
    useEffect(() => {
        let unmounted = false;
        fetch(`/user/${userid}`,{
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            //console.log(result)
           if(!unmounted)
            setProfile(result)
        })

        return () => {
            unmounted = true;
        }
    },[])

    return (
        <>
              {userProfile ?
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
                            src = {userProfile.user.pic}
                            alt="user image"/>
                    </div>

                    <div>
                        <h4>{userProfile.user.name}</h4>
                        <h5>{userProfile.user.email}</h5>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>40 followers</h6>
                            <h6>40 following</h6>
                        </div>
                    </div>
                </div>         
                <div className="gallery">
                    {
                        userProfile.posts.map(item => {
                            return(
                                <img key={item._id} src={item.photo} alt={item.title} className="image-item"/>
                            )
                        })
                    }
                </div>
            </div> :
            <h2>Loading...!</h2> }
        </>        
    )
}

export default Profile;