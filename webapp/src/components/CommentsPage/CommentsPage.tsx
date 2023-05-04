import React, { useState } from "react";
import "./CommentsPage.css";
import { Marker } from "../Map/OSMap";
import { writeMarkerToDataSet } from "../Solid/WriteToPod";
import { Rating } from "react-simple-star-rating";
import { createAclForMarker } from "../Solid/Permissions";
import { getSessionWebID } from "../Solid/Session";

export default function CommentsPage(props: any) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [markerType, setMarkerType] = useState("restaurant");

  const writeMarkerToPod = async (
    title: string,
    comment: string,
    markerType: string,
    rating: number
  ) => {
    const markerData: Marker = {
      lat: props.lat[0],
      lng: props.lat[1],
      comment: comment,
      title: title.replace(" ", "_"),
      type: markerType,
      score: rating,
    };

    const webId  = getSessionWebID().webId;

    const markerUrl = webId.replace(/\/profile\/card#me/, '/public/markers/') + markerData.title;

    await writeMarkerToDataSet(
      markerUrl,
      markerData,
      "https://schema.org/location"
    );

    await createAclForMarker(markerUrl);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      markerTitle: { value: string };
      comment: { value: string };
      rating: { value: number };
    };

    await writeMarkerToPod(
      target.markerTitle.value,
      target.comment.value,
      markerType,
      rating
    );

    // quitar componente comentarios
    props.onSubmit(markerType);
  };

  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const cancelMarker = () => {
    props.onChange();
  };

  return (
    <div className="popupContainer">
      <div>
        <button className="cancel_button" onClick={cancelMarker}>
          <img
            className="cancel-button-img"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2Fmatt-icons_cancel.png&f=1&nofb=1&ipt=a1d797bc36ec42f99a52e4084bffc7c616bf0eee54d60f835aa29f7ba578a938&ipo=images"
            alt=""
          />
        </button>
      </div>
      <div className="main_form">
        <div className="commentform" id="formulario">
          <form className="form" onSubmit={handleSubmit} >
            <h1 style={{ color: "black" }}>Crear marcador</h1>
            <div className="form_field">
              <label htmlFor="markerTitle" style={{ color: "black" }}>Titulo del marcador:</label>
              <input
                id="markerTitle"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Titulo de ejemplo"
                style={{ color: "grey" }}
              />
            </div>
            <div className="form_field">
              <label htmlFor="marker-options">Tipo: </label>
              <select
                name="marker-options"
                id="marker-options"
                value={markerType}
                onChange={(event) => {
                  setMarkerType(event.target.value);
                }}
              >
                <option value="restaurant">Bar o restaurante</option>
                <option value="monument">Monumento</option>
                <option value="landscape">Paisaje / Mirador</option>
              </select>
            </div>
            <div className="form_field">
              <textarea
                id="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Escribe tu comentario aquí"
              ></textarea>
            </div>

            <div>
              <label htmlFor="score"></label>
              <Rating
                onClick={handleRating}
              />
            </div>

            <div className="form_field">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
