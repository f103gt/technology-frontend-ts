import React, {useState} from 'react';
import PlacesAutocomplete, {geocodeByAddress} from "react-places-autocomplete";
import {Form} from "react-bootstrap";

const AddressInput = ({updateRegion}) => {
    const [address, setAddress] = useState("");
    const handleSelect = async (value) => {
        const results =await geocodeByAddress(value);
        setAddress(value);
        updateRegion(value);
    };

    return (
        <div>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <Form.Control {...getInputProps({placeholder: "Enter delivery address"})}/>
                        <div >
                            {loading ? null :

                                suggestions.map((suggestion) => {
                                        const style = {
                                            backgroundColor: suggestion.active ? "#9f9aa4" : "#212529"
                                        }
                                        console.log(suggestion.description);
                                        return (
                                            <div style={{backgroundColor: '#212529'}}{...getSuggestionItemProps(suggestion,{style})}>
                                                {suggestion.description}
                                            </div>);
                                    }
                                )}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
};

export default AddressInput;