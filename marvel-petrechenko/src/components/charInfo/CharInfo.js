import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
//import {CSSTransition} from "react-transition-group";


import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";


import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [inProp, setInProp] = useState(false);

    const {clearError, process, setProcess, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setInProp(true);
        console.log(inProp);
    }


        // const skeleton =  char || loading || error ? null : <Skeleton />
        // const errorMessage = error ? <ErrorMessage /> : null;
        // const spinner = loading ? <Spinner /> : null;
        // const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <>
                {/*<CSSTransition in={inProp} timeout={1500} classNames="char__info">*/}
                <div className="char__info">
                    {/*{skeleton}*/}
                    {/*{errorMessage}*/}
                    {/*{spinner}*/}
                    {/*{content}*/}
                    {setContent(process, View, char)}
                </div>
                {/*</CSSTransition>*/}
            </>

        )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'}
    }
    return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {(comics.length > 0) ? null : 'There is no comics'}
                    {
                        comics.map((item, i)=> {
                            if (i > 9) return;
                            let url = item.resourceURI.slice(43, 48);
                            return (
                                <li key={i} className="char__comics-item">
                                    <Link to={`/comics/${url}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;