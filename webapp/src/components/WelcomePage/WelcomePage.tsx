import "./WelcomePage.css";
import WelcomeText from "./subcomponents/WelcomeText";
import WelcomeSolid from "./subcomponents/WelcomeSolid";
import {
  OSMap,
  ShowMarkersFromPromise,
  ShowMarkersMultidimensional,
} from "../Map/OSMap";
import "aos/dist/aos.css";
import { useSession } from "@inrupt/solid-ui-react";
import { getFriendsFromPod, readFromFriendDataSet } from "../Solid/ReadFromPod";
import { useState } from "react";

export default function WelcomePage() {
  const { session } = useSession();

  return (
    <div className="welcome_page">
      {!session.info.isLoggedIn ? (
        <>
          <div className="welcome_text" data-aos="fade-down">
            <WelcomeText />
            <div
              className="arrow"
              onClick={() =>
                document
                  .getElementById("solid")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            ></div>
          </div>
          <div className="solid" id="solid">
            <WelcomeSolid />
          </div>
        </>
      ) : (
        <div className="map-container">
          <button
            onClick={async () => {
              try {
                const friends: any = await getFriendsFromPod();
                const promises: Promise<any>[] = friends.flatMap((e: any) => {
                  return readFromFriendDataSet(e);
                });
                const arrays: any[] = await Promise.all(promises);
                console.log(arrays);
                ShowMarkersMultidimensional(arrays);
              } catch (error) {
                // Handle errors here
                console.log(error);
              }
            }}
          >
            Amigos
          </button>
          <div className="map" data-aos="fade-down">
            <OSMap />
          </div>
        </div>
      )}
    </div>
  );
}
