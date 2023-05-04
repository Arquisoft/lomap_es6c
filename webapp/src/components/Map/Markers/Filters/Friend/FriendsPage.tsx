import { useEffect, useState } from "react";
import { getAllFriendsFromPod, readFromDataSetUrl} from "../../../../Solid/ReadFromPod";
import { ShowMarkersFulfilledPromise } from "../../../OSMap";
import "./FriendsPage.css";
export default function FriendsPage(props: any){

    const [, setMarkers] = useState<any[]>([]);
    const [friends, setFriends] = useState([]);

    var markersToAdd: any[] = [];
    async function readFromFriend(url: string) {
      try {
        const markersArray = await readFromDataSetUrl(url);
        markersToAdd = markersArray;
      } catch (error) {
        console.error(error);
        setMarkers([]);
      }
    }
    
    const cancelFilter = () => {
        props.onChange();
      };

    const getAllFriends = () => {
        getAllFriendsFromPod().then((friends: any) => {
            setFriends(friends);
        });
    }

    const clickOnFriend = async (friend: string) => {
        props.changeLoading();
        try{
          await readFromFriend(friend);
          ShowMarkersFulfilledPromise(markersToAdd, props.changeMarkerInfo, props.changeLoading);
        } catch (error) {
          console.log(error);
        } finally{
          cancelFilter();
        }
    }
    
    useEffect(() => {
        getAllFriends();
      }, []);

    function getFriendName(url: string){
        const name = url.match(/https:\/\/(.+?)\.inrupt/);
        if (name) return name[1];
        else return "Unknown";
    }

    return (
        <div className="popupContainer">
       <div>
            <button className="cancel_button"
              onClick={cancelFilter}
            >
              <img className="cancel-button-img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2Fmatt-icons_cancel.png&f=1&nofb=1&ipt=a1d797bc36ec42f99a52e4084bffc7c616bf0eee54d60f835aa29f7ba578a938&ipo=images" alt="" />
            </button>
            <div>
            <div className="friends">
                {friends.map((friend) => ( <div className ="friend-button-container">
                    <button className ="friend-button" key={friend} onClick={() => clickOnFriend(friend)}>
                    </button>
                    <div className="friend-name">{getFriendName(friend)}</div>
                    </div>
                 ))}
            </div>
    </div>
          </div>
      <div className="main_form">
      </div>
    </div>
    );
}