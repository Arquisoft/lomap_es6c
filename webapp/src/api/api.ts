
export async function addMarker(marker:{ lat:number, lng:number, comment:string }):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/markers/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'lat':marker.lat, 'lng':marker.lng, 'comment':marker.comment})
      });
    if (response.status===200)
      return true;
    else
      return false;
}