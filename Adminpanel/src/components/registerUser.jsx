import React, { useState } from 'react';
import Footer from '../components/general/Footer';
import Form from '../components/general/forms/core/Form';
import FormActions from '../components/general/forms/core/FormActions';
import TextInput from '../components/general/forms/TextInput';
import Text from '../components/general/typography/Text';
import { validateEmail, validatePassword } from '../utils/validation';

import { API_BASE_URL, JWT_SECRET, LOGGER, BASE_URL } from '../src/config';
import { isExpired, decodeToken, useJwt } from "react-jwt";
import verifyToken from '../verify-jwt';

import axios from 'axios';
import PlainStep from '../components/general/forms/PlainStep';

import { notifyError, notifySuccess } from '../utils/toastify';
import { REQUEST_ERROR } from '../utils/messages';
import { ToastContainer } from 'react-toastify';
import SplitContainer from '../components/general/containers/SplitContainer';
import RadioButtonGroup from '../components/general/forms/RadioButtonGroup';
import RadioButtonInput from '../components/general/forms/RadioButtonInput';
import FileInput from '../components/general/forms/FileInput';

const registerUser = () => {

    const [fullName, setFullName] = useState("");
    const [emailID, setEmailID] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [isFullNameError, setIsFullNameError] = useState(false);

    const [fullNameErrorTxt, setFullNameErrorTxt] = useState("");
    const [emailErrorTxt, setEmailErrorTxt] = useState("");


    const submitSignUpForm = async (e) => {
        e.preventDefault();

        if(fullName === ''){
            setFullNameErrorTxt('Name is required');
            setIsFullNameError(true);
            return
        }
        else{
            setFullNameErrorTxt('');
            setIsFullNameError(false);
        }

        let isEmailValid = validateEmail(emailID);
        if(isEmailValid === false){
            setIsEmailError(true);
            setEmailErrorTxt("Enter a Valid Email ID");
            return
        }
        let isPasswordValid = validateEmail(password);
        if(isPasswordValid === false){
            setIsEmailError(true);
            setEmailErrorTxt("Enter a Valid Password");
            return
        }
        const data = {
            name: fullName,
            email_id: emailID,
            password: password
        }

        console.log(data);

        try {
            const createOperatorReq = await axios.post(`${API_BASE_URL}operator`, data);
            LOGGER &&  console.log(createOperatorReq);
        }
        catch (error) {
            notifyError(REQUEST_ERROR);
            LOGGER &&  console.log(error);
        }
    }

    const resetForm = async () => {
        setFullName("");
        setEmailID("");
        setIsFullNameError(false);
        setIsEmailError(false);
        setFullNameErrorTxt("");
        setEmailErrorTxt("");

    }

    return (
        <>
            {/* <div className="registrationBg">
                <img src="images/login-bg.jpg" className="registrationBgImg" />
            </div> */}
            <div className="registration">
                <div className="registerContent">
                    <div className="loginContentInner">
                        <div className="loginContentLogo hCenter">
                            <div className="loginContentLogoImage center">
                                <div className="loginContentLogoImageInner">
                                    <img src={`${BASE_URL}images/logo-login.jpg`} className='loginContentLogoImg' />
                                </div>
                            </div>
                        </div>
                        <div className="loginFormContent">
                            <div className="loginFormContentHeading hCenter">
                                <Text variant="page-heading" type="default">operator registration</Text>
                            </div>

                            <form onSubmit={(e) => submitSignUpForm(e)} noValidate>
                                <Form paddingTop={true}>
                                    <SplitContainer type={`fullwidth`}>
                                        <TextInput lable="full name" isMandatory={true} isError={isFullNameError} error={fullNameErrorTxt}>
                                            <input type="text" onChange={(e) => setFullName(e.target.value)} className="formStepInputTxt capitalize" placeholder="Enter Your Full Name" value={fullName} />
                                        </TextInput>
                                        <TextInput lable="email ID" isMandatory={true} isError={isEmailError} error={emailErrorTxt}>
                                            <input type="email" onChange={(e) => setEmailID(e.target.value)} className="formStepInputTxt" placeholder="Enter Your Email ID" value={emailID} />
                                        </TextInput>
                                    </SplitContainer>
                                    <SplitContainer type={`fullwidth`}>
                                        <TextInput lable="phone no" isMandatory={true} isError={isPhoneNoError} error={phoneNoErrorTxt}>
                                            <input type="tel" onChange={(e) => checkAndSetPhoneNumber(e)} className="formStepInputTxt" placeholder="Enter Your Phone No" value={phoneNo} />
                                        </TextInput>
                                        <TextInput lable="alternative phone no" isMandatory={false} isError={isAltPhoneNoError} error={altPhoneNoErrorTxt}>
                                            <input type="tel" onChange={(e) => checkAndSetAltPhoneNumber(e)} className="formStepInputTxt" placeholder="Enter Your Alt Phone No" value={altPhoneNo} />
                                        </TextInput>
                                    </SplitContainer>
                                    <SplitContainer type={`fullwidth`}>
                                        <TextInput lable="education qualification" isMandatory={true} isError={isEducationQualificationError} error={educationQualificationErrorTxt}>
                                            <input type="text" onChange={(e) => setEducationQualification(e.target.value)} className="formStepInputTxt capitalize" placeholder="Enter Your Education Qualification" value={educationQualification} />
                                        </TextInput>
                                        <TextInput lable="work experience" isMandatory={false} isError={isWorkExpError} error={workExpErrorTxt}>
                                            <input type="text" onChange={(e) => setWorkExp(e.target.value)} className="formStepInputTxt" placeholder="Enter Your Work Experience" value={workExp} />
                                        </TextInput>
                                    </SplitContainer>
                                    <SplitContainer type={`fullwidth`}>
                                        <TextInput lable="aadhaar no" isMandatory={true} isError={isAadhaarNoError} error={aadhaarNoErrorTxt}>
                                            <input type="text" onChange={(e) => checkAndSetAadhaarNo(e)} className="formStepInputTxt" placeholder="Enter Your Aadhaar No" value={aadhaarNo} />
                                        </TextInput>
                                        <TextInput lable="NSEIT no" isMandatory={true} isError={isNseitNoError} error={nseitNoErrorTxt}>
                                            <input type="text" onChange={(e) => setNseitNo(e.target.value)} className="formStepInputTxt" placeholder="Enter Your MSEIT No" value={nseitNo} />
                                        </TextInput>
                                    </SplitContainer>
                                    <SplitContainer type={`fullwidth`}>
                                        <TextInput lable="bike" isMandatory={false} isError={isPhoneNoError} error={phoneNoErrorTxt}>
                                            <input type="text" onChange={(e) => setBike(e.target.value)} className="formStepInputTxt capitalize" placeholder="Enter Your Bike Model" value={bike} />
                                        </TextInput>
                                        <TextInput lable="driving license no." isMandatory={false} isError={isDlNoError} error={dlNoErrorTxt}>
                                            <input type="tel" onChange={(e) => checkAndSetDlNumber(e)} className="formStepInputTxt" placeholder="Enter Your Driving license No" value={dlNo} />
                                        </TextInput>
                                    </SplitContainer>
                                    <SplitContainer type={`fullwidth`}>
                                        <TextInput lable="district" isMandatory={true} isError={isPhoneNoError} error={phoneNoErrorTxt}>
                                            <input type="text" onChange={(e) => setDistrict(e.target.value)} className="formStepInputTxt capitalize" placeholder="Enter Your District" value={district} />
                                        </TextInput>
                                        <TextInput lable="taluk" isMandatory={true} isError={isTalukError} error={talukErrorTxt}>
                                            <input type="text" onChange={(e) => setTaluk(e.target.value)} className="formStepInputTxt capitalize" placeholder="Enter Your Taluk" value={taluk} />
                                        </TextInput>
                                    </SplitContainer>
                                    <SplitContainer type={`fullwidth`}>
                                        <TextInput lable="grama panchayat" isMandatory={true} isError={isGramaError} error={gramaErrorTxt}>
                                            <input type="text" onChange={(e) => setGrama(e.target.value)} className="formStepInputTxt capitalize" placeholder="Enter Your Grama Panchayat" value={grama} />
                                        </TextInput>
                                        <TextInput lable="pincode" isMandatory={true} isError={isPincodeError} error={pincodeErrorTxt}>
                                            <input type="tel" onChange={(e) => checkAndSetPincode(e)} className="formStepInputTxt capitalize" placeholder="Enter Your Pincode" value={pincode} />
                                        </TextInput>
                                    </SplitContainer>
                                    <SplitContainer type={`fullwidth`}>
                                        <RadioButtonGroup lable="Own A Shop?" capitalize={true} isMandatory={true} isError={false} error={``}>
                                            <RadioButtonInput lable="Yes" name="hasShop" value="TRUE" checked={hasShop === 'TRUE' ? true : false} onchange={(data) => {setHasShop(data);}} />
                                            <RadioButtonInput lable="No" name="hasShop" value="FALSE" checked={hasShop === 'FALSE' ? true : false} onchange={(data) => {setHasShop(data);}} />
                                        </RadioButtonGroup>
                                        {
                                            hasShop === "TRUE"
                                            ?
                                            <TextInput lable="shop name" isMandatory={true} isError={isShopNameError} error={shopNameErrorTxt}>
                                                <input type="text" onChange={(e) => setShopName(e.target.value)} className="formStepInputTxt capitalize" placeholder="Enter Your Shop Name" value={shopName} />
                                            </TextInput>
                                            :
                                            <></>
                                        }
                                    </SplitContainer>
                                    <TextInput lable="description" isMandatory={false} isError={isDescriptionError} error={descriptionErrorTxt}>
                                        <textarea onChange={(e) => setDescription(e.target.value)} rows="3" className="formStepInputTxtarea" placeholder="Describe Your Experience" value={description}></textarea>
                                    </TextInput>
                                    <PlainStep>
                                        <div className="formStepFileInputRegister">
                                            <FileInput lable="Photo" isMandatory={true} value={photoId} preview={photoUrl} onchange={(data) => {setPhotoId(data); LOGGER &&  console.log(data)}} isError={isPhotoError} error={photoErrorTxt} reset={resetAttachment} />
                                            <FileInput lable="Aadhar" isMandatory={true} value={aadharId} preview={aadharUrl} onchange={(data) => {setAadharId(data); LOGGER &&  console.log(data)}} isError={isAadhaarError} error={aadhaarErrorTxt} reset={resetAttachment} />
                                            <FileInput lable="NSEIT Certificate" isMandatory={true} value={nseitId} preview={nseitUrl} onchange={(data) => {setNseitId(data); LOGGER &&  console.log(data)}} isError={isNseitError} error={nseitErrorTxt} reset={resetAttachment} />
                                            <FileInput lable="Education Certificate" isMandatory={true} value={qualificationId} preview={qualificationUrl} onchange={(data) => {setQualificationId(data); LOGGER &&  console.log(data)}} isError={isQualificationError} error={qualificationErrorTxt} reset={resetAttachment} />
                                            {
                                                hasShop === "TRUE"
                                                ?
                                                <FileInput lable="Shop Photo" isMandatory={true} value={shopPhotoId} preview={shopPhotoUrl} onchange={(data) => {setShopPhotoId(data); LOGGER &&  console.log(data)}} isError={isShopPhotoError} error={shopPhotoErrorTxt} reset={resetAttachment} />
                                                :
                                                <></>    
                                            }
                                        </div>
                                    </PlainStep>
                                    <FormActions isPrimary={true} isSecondary={true} primaryLable="submit" secondaryLable="reset" secondaryAction={() => resetForm()} />
                                </Form>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </> 
    )
}

export default registerUser;