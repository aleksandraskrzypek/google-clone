import React from 'react'
import './SearchPage.css'
import {useStateValue} from "./StateProvider"
import useGoogleSearch from './useGoogleSearch';
import Response from "./response"
import {Link} from "react-router-dom"
import Search from "./pages/Search"
import SearchIcon from "@material-ui/icons/Search"
import DescriptionIcon from "@material-ui/icons/Description"
import ImageIcon from "@material-ui/icons/Image"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import RoomIcon from "@material-ui/icons/Room"
import MoreVertIcon from "@material-ui/icons/MoreVert"


function SearchPage(){
    const [{ term}, dispatch] = useStateValue();

    //LIVE API CALL
    const {data} = useGoogleSearch(term)

    //Mock API CALL
    //const data = Response;

    console.log(data)
    return(
        <div className="searchPage">
            <div className="searchPage-header">
                <Link to="/">
                    <img    
                        className="searchPage-logo"
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        alt="google_logo"
                    />
                </Link>
                <div className="searchPage-headerBody">
                    <Search hideButtons />
                
                    <div className="searchPage-options">
                        <div className="searchPage-optionsLeft">
                            <div className="searchPage-option">
                                <SearchIcon />
                                <Link to ="/all">All</Link>
                            </div>
                            <div className="searchPage-option">
                                <DescriptionIcon />
                                <Link to ="/news">News</Link>
                            </div>
                            <div className="searchPage-option">
                                <ImageIcon />
                                <Link to ="/images">Images</Link>
                            </div>
                            <div className="searchPage-option">
                                <LocalOfferIcon />
                                <Link to ="/shopping">shopping</Link>
                            </div>
                            <div className="searchPage-option">
                                <RoomIcon />
                                <Link to ="/maps">maps</Link>
                            </div>
                            <div className="searchPage-option">
                                <MoreVertIcon />
                                <Link to ="/more">more</Link>
                            </div>
                        </div>

                        <div className="searchPage-optionsRight">
                            <div className="searchPage-option">
                                <Link to ="/settings">Settings</Link>
                            </div>
                            <div className="searchPage-option">
                                <Link to ="/tools">Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {term && (
                <div className="searchPage-results">
                    <p
                    className="searchPage-resultCount">
                        About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}
                    </p>

                    {data?.items.map(item => (
                        <div className="searchPage-result">
                              <a 
                                className="searchPage-resultLink"
                                href={item.link}>
                                {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                    <img 
                                    className="searchPage-resultImage"
                                    src={
                                        item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src
                                    }
                                    alt=""
                                    />
                                )}
                                {item.displayLink} &#9661;
                            </a>
                            <a 
                            className="searchPage-resultTitle" 
                            href={item.link}>
                                <h2>{item.title}</h2>
                            </a>
                            <p className="searchPage-resultSnippet">
                                {item.snippet}
                            </p>
                        </div>
                    ))}
                </div>
            )}
           
        </div>
    )
}

export default SearchPage

//https://developers.google.com/custom-search/v1/using_rest

//AIzaSyA50tyw-U6p-ABzp6Qut5mE-DaQmwjz_UU

//https://cse.google.com/cse/create/new