import {useState} from "react";
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from "formik";
import {Link} from "react-router-dom";
import * as Yup from 'yup';

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import setContent from "../../utils/setContent";

import './charSearchForm.scss'

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const validate = values => {
         const errors = {};
         if (!values.charName) {
                 errors.name = "Name is required"
         } else if (values.charName.length < 2) {
                 errors.name = 'Name is too short, min 2 symbols'
         }
        return errors;
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = name => {
        clearError();
        getCharacterByName(name).then(onCharLoaded).then(() => setProcess('confirmed'));
    }

    const errorMessage = process === 'error' ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again.
        </div>

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('Name is required')
                })}
                onSubmit = {({charName}) => {updateChar(charName)}}
            >
                <Form>
                    <label htmlFor="charName" className="char__search-label">
                        Or find a character by name:
                    </label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name="charName"
                            type="text"
                            placeholder="Enter name"/>
                            <button
                                type='submit'
                                className="button button__main"
                                disabled={process === 'loading'}>
                                <div className="inner">find</div>
                            </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>

    )
}

export default CharSearchForm;
