import {
  CombinedDataProvider,
  Image,
  LogoutButton,
  Text,
} from "@inrupt/solid-ui-react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { Link } from "react-router-dom";
import { getSessionWebID } from "../Session";

const ProfileViewer = () => {
  const { session, webId } = getSessionWebID();

  const buttonStyle = {
    marginTop: "2em",
    backgroundColor: "#ee7e51",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <Container fixed>
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <Card
          style={{ padding: "1.5em", marginTop: "3em", marginBottom: "2em" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Text property={FOAF.name.iri.value} />
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Text property={VCARD.role.iri.value} />
            </Typography>
          </CardContent>
          <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
            <Image property={VCARD.hasPhoto.iri.value} width={480} />
          </CardActionArea>
        </Card>
      </CombinedDataProvider>
      <Link to="/start" style={{ color: "#ee7e51", fontWeight: "bold" }}>
        Mi mapa
      </Link>
      <LogoutButton>
        <Button style={buttonStyle} variant="contained" color="primary">
          Logout
        </Button>
      </LogoutButton>
      <Button style={buttonStyle} variant="contained" color="primary">
        <Link to="/friends">Amigos</Link>
      </Button>
    </Container>
  );
};

export default ProfileViewer;
