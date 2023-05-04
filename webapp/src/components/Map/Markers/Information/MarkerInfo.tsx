import { useEffect, useState } from "react";

import {  getSessionWebID } from "../../../Solid/Session";
import { Marker } from "../../OSMap";
import { Rating } from "react-simple-star-rating";
import "./MarkerInfo.css";
import { readFromDataSetUrl } from "../../../Solid/ReadFromPod";
import ReactLoading from 'react-loading';

export default function MarkerInfo(props: any) {
  const [comment, setComment] = useState("");
  const [marker, setMarker] = useState<Marker>();
  const [isLoading, setIsLoading] = useState(false);

  const readMarkerFromPod = async (
    target: any
  ) => {

    const webId  = getSessionWebID().webId;

    const markerUrl = webId.replace(/\/profile\/card#me/, '/public/markers/') + target;

    setIsLoading(true);
    const markers = await readFromDataSetUrl(markerUrl);
    setIsLoading(false);

    const onlyMarker = markers[0];

    const markerData: Marker = {
      lat: onlyMarker.lat[0],
      lng: onlyMarker.lat[1],
      comment: onlyMarker.comment,
      title: onlyMarker.title,
      type: onlyMarker.type,
      score: onlyMarker.score,
    };
    console.log(onlyMarker)
    return markerData;
  };

  useEffect(() => {
    readMarkerFromPod(props.marker.options.title).then((marker) => {
      setMarker(marker);
    });
  }, [props.marker.options.title]);
 
  const cancel = () => {
    props.onChange();
  };

  return (
    <div className="popupContainer">
      {isLoading ? (
        <div className="loading">
            <ReactLoading type="spin" color="#000" height={50} width={50} />
        </div>
        ) : (
            <>
              <div>
                <button className="cancel_button" onClick={cancel}>
                  <img
                    className="cancel-button-img"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2Fmatt-icons_cancel.png&f=1&nofb=1&ipt=a1d797bc36ec42f99a52e4084bffc7c616bf0eee54d60f835aa29f7ba578a938&ipo=images"
                    alt=""
                  />
                </button>
              </div>
              <div className="main_form">
                <div className="commentform" id="formulario">
                  <form className="form" >
                    <h1 style={{ color: "black" }}>{marker?.title} <img className="icon-place" src={props.marker.options.icon.options.iconUrl} alt=""/> </h1>
                    <div>
                    <h3>{marker?.comment}</h3>
                      <label htmlFor="score"></label>
                      <Rating initialValue={marker?.score} readonly size={16}/>
                    </div>
                    
                    <div className="form_field">
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="Comment"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </>
        )}
    </div>
  );
}
