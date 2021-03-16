import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {FaCamera,FaFolder, FaChartBar} from 'react-icons/fa';
import * as faceapi from "face-api.js";
import dafultImg from '../img/image-solid.png';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import Loader from "./Loader";


class MainSection extends Component {
    constructor() {
        super();
        this.webcamRef=React.createRef();
        this.state={
            loaderDIV:"d-none",
            firstPhoto:dafultImg,
            secondPhoto:dafultImg,
            FirstPhotoDesc:[],
            SecondPhotoDesc:[],
            similarity:0,
            distance:0,
            result:"....."
        }
    }

    firstPhotoUplod=()=>{
        let firstImageFile = this.firstPhotoFile.files[0];
        let firstImageReader = new FileReader();
        firstImageReader.onload = (event)=>{
            this.setState({firstPhoto:event.target.result})
        }
        firstImageReader.readAsDataURL(firstImageFile);
        this.firstPhotoCalculation();
    }
    firstPhotoCalculation=()=>{
        (async ()=>{
            this.setState({loaderDIV:""})
            await  faceapi.loadSsdMobilenetv1Model('/models');
            await  faceapi.loadFaceLandmarkModel('/models');
            await  faceapi.loadFaceRecognitionModel('/models');
            const img=document.getElementById('firstPhotoId');
            const imgDesc= await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            this.setState({
                FirstPhotoDesc:imgDesc['descriptor']
            })
            this.setState({loaderDIV:"d-none"});
        })()
    }
    secondPhotoUplod=()=>{
        let secondImageFile = this.secondPhotoFile.files[0];
        let secondImageReader = new FileReader();
        secondImageReader.onload = (event)=>{
            this.setState({secondPhoto:event.target.result})
        }
        secondImageReader.readAsDataURL(secondImageFile);
        this.secondPhotoCalculation();
    }
    secondPhotoCalculation=()=>{
        (async ()=>{
            this.setState({loaderDIV:""})
            await  faceapi.loadSsdMobilenetv1Model('/models');
            await  faceapi.loadFaceLandmarkModel('/models');
            await  faceapi.loadFaceRecognitionModel('/models');
            const img=document.getElementById('secondPhotoId')
            const imgDesc= await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
            this.setState({
                SecondPhotoDesc:imgDesc['descriptor']
            })
            this.setState({loaderDIV:"d-none"})
        })()
    }
    getAnalysis=()=>{
        let FirstPhoto= this.state.FirstPhotoDesc;
        let SecondPhoto= this.state.SecondPhotoDesc;

        let distance= faceapi.euclideanDistance(FirstPhoto,SecondPhoto);
        let similarity=1-distance;

        this.setState({distance:distance})
        this.setState({similarity:similarity})

        if(similarity>0.50){
            this.setState({result:"Same Parson"})
        }
        else {
            this.setState({result:"Different Parson"})
        }
    }
    render() {
        return (
            <Fragment>
                <div className="mainDiv">
                    <Container>
                        <Row className="main-section shadow-sm p-3">
                            <Col sm={12} md={4} lg={4} className="p-2 border text-center">
                                <img className="w-100" id="firstPhotoId" src={this.state.firstPhoto} alt=""/>
                                <input className="d-none" onChange={this.firstPhotoUplod} ref={(fileInput)=>this.firstPhotoFile=fileInput} type="file"/>
                                <button className="btn btn-primary my-2" onClick={()=>{this.firstPhotoFile.click()}}>First Image</button>
                            </Col>
                            <Col sm={12} md={4} lg={4} className="p-2 border text-center">
                                <img className="w-100" id="secondPhotoId" src={this.state.secondPhoto} alt=""/>
                                <input className="d-none" onChange={this.secondPhotoUplod} ref={(fileInput)=>this.secondPhotoFile=fileInput} type="file"/>
                                <button className="btn btn-primary my-2" onClick={()=>{this.secondPhotoFile.click()}}>Second Image</button>
                            </Col>
                            <Col sm={12} md={4} lg={4} className="p-2 border text-center">
                                <div className="input-group">
                                    <CircularProgressbar
                                        className="CircularProgressbar"
                                        value={this.state.similarity}
                                        maxValue={1}
                                        text={`${(this.state.similarity * 100).toFixed(2)}%`}
                                        styles={{
                                            path: {
                                                stroke: `#5cb85c`,
                                            }
                                        }}
                                    />

                                    <CircularProgressbar
                                        className="CircularProgressbar"
                                        value={this.state.distance}
                                        maxValue={1}
                                        text={`${(this.state.distance * 100).toFixed(2)}%`}
                                        styles={{
                                            path: {
                                                stroke: `#d9534f`,
                                            }
                                        }}
                                    />
                                </div>
                                <h4>Result: <b className="text-danger">{this.state.result}</b></h4>
                                <button className="btn btn-success" onClick={this.getAnalysis}>Analysis</button>
                            </Col>
                            <Col lg={12} sm={12} md={12} className="py-1 text-center">
                                <h6 className="border p-2">All content reserved by Jahid Hassan Shovon</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={this.state.loaderDIV}>
                    <Loader></Loader>
                </div>
            </Fragment>
        );
    }
}

export default MainSection;