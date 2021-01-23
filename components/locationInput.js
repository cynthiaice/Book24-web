import states from './states.json'


const LocationInput = ({saveLocation}) => {
    return (
        <select name="location" id="locationId"
 onChange={saveLocation}>
{states.map((element)=> <option value={element.toLowerCase()}>{element}</option>)}
</select>
    );
}
export default LocationInput;