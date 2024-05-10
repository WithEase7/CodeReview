
import React, { Component } from 'react';
import { Link } from 'react-router';
import CountryContainer from '../../Country/container/CountryContainer';
import "../css/msgcss.css";
import styles from "../../../Globals/imageCss";
import { setRfqData, getMonthDate, handlePostOrder, handleOrderAttWebview, regionalCallNowText, getObjFromArray,handleWebViewBack, checkEnquirySent, checkIsqFilled, callDurationBucket, notificationTrackingMap, saveConversationData, getConversationData, saveContactData, getContactData, saveWithExpiry, getWithExpiry, updateDataLoadingStatus } from '../utility/msgUtility';
import {setLoginMode,trackPVForMessages} from '../utility/landingSource';
import {threeDotIcon,attachIcon,cameraIcon,blueTick,greyTick,orderCallIcon, postOrderCall,callNowIconOneTap} from '../utility/msgesSvg';
import { getCookie, getCookieValByKey,deleteCookie} from '../../../Globals/CookieManager';
import { checkUserStatus, getQueryStringValue } from '../../../Globals/MainFunctions';
import { eventTracking, gaTrack} from '../../../Globals/GaTracking';
import { doxssHandling } from '../../../Globals/xssHandling';
import { yandexTrackingMultiLevel } from '../../../Globals/yandexTracking';
import { getSuggestedReplies, stripHtml } from '../utility/suggestiveReply';
import getData from "../../../Globals/RequestsHandler/makeRequest";
import Compressor from 'compressorjs';
import { browserHistory } from 'react-router';
import ImageZoomer from './ImageZoomer'
import {zones} from '../utility/zones';
import {saveCallDuration} from '../../../Globals/CallDuration';
import "../../App/styles/index.css"
import { updateNo } from '../../CallNow/utility/updateMobileNumber';
import { goToRoute } from '../../../Globals/GlobalFunc';
import bannerDeepLinking from '../../CentralizePopUp/components/deepLinking';
import ConfirmPopup from '../popups/ConfirmPopup'
import { oneTapEnquiry } from '../utility/EnquiryHit';
import AppInstallBanner from '../../CentralizePopUp/components/AppInstallBanner';
class messageDetail extends Component {

  constructor(props) {
    super(props);
    this.glid = getCookieValByKey('ImeshVisitor', 'glid');
    this.abMiniCat = false;
    this.first_name=getCookieValByKey('ImeshVisitor', 'fn')
    this.userMode = checkUserStatus();
    this.displayID = '';
    this.displayIDEnq = '';
    this.detailsRelated = '';
    this.webRatType=''
    this.webRatVal=''
    this.name = getCookieValByKey("ImeshVisitor","fn")
    this.buyerMsgCount = 0;
    this.userSentMsg = false;
    this.userCalled = false;
    this.smsLanding = window && window.location && window.location.href && window.location.href.includes('sms');
    this.ThankYouMsg = window && window.location && window.location.href && window.location.href.includes('TYPageLanding=2');
    this.oddGlid = this.glid%2 == 1;
    this.webviewUiAbTest = this.glid % 10 == 1 || this.glid % 10 == 3 || this.glid % 10 == 5 || this.glid % 10 == 7;
    this.notificationWebview = false;
    this.query_ref_text = '';
    this.webviewContent=window.navigator &&window.navigator.userAgent&&( window.navigator.userAgent.includes('IM-Android_Webview')||window.navigator.userAgent.includes('IM-IOS-WebView'));
    this.androidWebview = window.navigator && window.navigator.userAgent&&( window.navigator.userAgent.includes('IM-Android_Webview'))
    if (self == null) {

      this.state = { showList : false, 'reply': { 'f': [], 'date_time': [], 'details': [], 'attachments': [], 'names': [] }, desc: '', align: 'right', check: true, isCntctFraud: false, newHit: false, currentReply: false, prevPage: 'contdet', "checkdetail": true, leftDrawer: false, hrzntlTemp: false, randomTemp: [], isEventBind: false, isFraudUser: false, showRating: true, rating_val: 0, rfqid: 400, rateTrack: true, verifyBlocker: '', reqCanclled: '', feedbackForm: '',ratingFormMail:'', HamburgerMenu: '', EnqBlComponent: '', VoiceHTML: '', mlStatus: '', loaderTemp: [], mlData: '', showStrip: '', showPostCall: false, postCallWrapper: '', userType: '', typingStatus:'Online', hitReadReceipt:true,hitPresense:true,showPrdDetail: false,PrdData:'',loginModule:'',stdLoaded:'',momentJS:'',imgClicked: false,showTYPage: false,/*pwim:true,*/showCall:false,ratImgClicked: false, ratImageSelected: '',ratingImages:'',ratingAlign: '',postOrderDetail:'',orderProdImg:'',orderProdName:'',showPostOrderPopUp:false,MsgAlign:'',orgSts:'',OrderNow_1:'',OrderNow_2:'',productPrice:'',unit:'',showOrderNowPop:false,showOrderNowDetail:false,templateCode:'',ratingFormOpen: false,lastmsg:'',replyCode:'', smsLanding: false,postCallRating:false,prodID:'', viewDetailsMiniPDP: false, orderImageClicked:false,fromOrder: false,popUpClicked: false,convRate:false,ratTypList:'',miniCatalog: '',showMiniCatalog: false,fromFirstEnq: false,rateAfterCall:false,listCallRate:false,showCard:true,newCallback:false,showNewCallPopup:false, ratingImgPopup: '', isTextBoxEmpty: true, tempSugg: false, quantityValue: '', isError: false, errText: "", messagesIsq: '', selectedUnit1: {}, selectedUnit2: {}, showIsqQuestion: true, showBubbleChat: true, isqQuestionVisible: false, userState: '',suggestion:[],webCall:true, showConfirmPopup: false,showOneTapIsq:false,custReply:true, showAppBanner: false,reply_sent:true,chatNowReplySent:false,showReplyBox:true,ttfbTrack:false, spreadAttach: [], enableScrolling: true};
    }
    else {
      this.state = { showList : false, 'reply': { 'f': [], 'date_time': [], 'details': [], 'attachments': [], 'names': [] }, desc: '', align: 'right', check: true, isCntctFraud: false, newHit: false, currentReply: false, "checkdetail": true, leftDrawer: false, hrzntlTemp: false, randomTemp: [], isEventBind: false, isFraudUser: false, showRating: true, rating_val: 0, rfqid: 400, rateTrack: true, verifyBlocker: '', reqCanclled: '', feedbackForm: '',ratingFormMail: '', HamburgerMenu: '', EnqBlComponent: '', VoiceHTML: '', showPostCall: false, postCallWrapper: '', mlStatus: '', loaderTemp: [], mlData: '', showStrip: '', userType: '' , typingStatus:'Online', hitReadReceipt:true,hitPresense:true,showPrdDetail: false,PrdData:'',loginModule:'',stdLoaded:'',momentJS:'',imgClicked: false,showTYPage: false,/*pwim:true,*/showCall: false,ratImgClicked: false, ratImageSelected: '',ratingImages:'',ratingAlign: '',postOrderDetail:'',orderProdImg:'',orderProdName:'',showPostOrderPopUp:false,MsgAlign:'',orgSts:'',OrderNow_1:'',OrderNow_2:'',productPrice:'',unit:'',showOrderNowPop:false,showOrderNowDetail: false,templateCode:'',ratingFormOpen: false,lastmsg:'',replyCode:'', smsLanding: false,postCallRating:false,prodID:'', viewDetailsMiniPDP: false, orderImageClicked:false,fromOrder: false,popUpClicked: false,convRate:false,ratTypList:'',miniCatalog: '',showMiniCatalog: false,fromFirstEnq: false,rateAfterCall:false,listCallRate:false,showCard:true,newCallback:false,showNewCallPopup:false, ratingImgPopup: '', isTextBoxEmpty: true, tempSugg: false, quantityValue: '', isError: false, errText: "", messagesIsq: '', selectedUnit1: {}, selectedUnit2: {}, showIsqQuestion: true, showBubbleChat: true, isqQuestionVisible: false, userState: '',suggestion:[],webCall:true, showConfirmPopup: false,showOneTapIsq:false,custReply:true, showAppBanner: false,reply_sent:true,chatNowReplySent:false,showReplyBox:true,ttfbTrack:false, spreadAttach: [], enableScrolling: true};
    }
    if (!this.props.location.state && this.props.location.query.sup_glid == undefined) {
      location.href = '/messages/'
    }
    else {
      this.contact_glid = (this.props.location.query.sup_glid !== undefined) ? atob(this.props.location.query.sup_glid) : this.props.location.state.contactglid?this.props.location.state.contactglid:this.props.location.state.receiverUserId;
    }
    if(window.refBack){
      window.refBack= true
    }
    else{
      window.refBack = false
    }
    if(window.location.href.indexOf("utm_source") > -1 || window.location.href.indexOf("isLandingFromEmail") > -1){
    this.referencePathName = location.href;
    }
    else{
      this.referencePathName = ''
    }
    document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : ""
    window.addEventListener("scroll", this.handleScrollDetail, {passive:true});
    this.trackTouchEvent = this.trackTouchEvent.bind(this);
    window.addEventListener("click", this.trackTouchEvent,{passive:true});
    this.trackFocusEvent = this.trackFocusEvent.bind(this);
    this.closeStdProduct = this.closeStdProduct.bind(this);
    this.editRating = this.editRating.bind(this);
    this.createRatingHtml = this.createRatingHtml.bind(this);
    this.timeformatAMPM = this.timeformatAMPM.bind(this);
    this.getProductDetails = this.getProductDetails.bind(this);
    this.dateformatslash = this.dateformatslash.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadRatingMailForm = this.loadRatingMailForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadMoreRowsDetail = this.loadMoreRowsDetail.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.textLink = this.textLink.bind(this);
    this.handleCallMsg = this.handleCallMsg.bind(this);
    this.quotedReply=this.quotedReply.bind(this);
    // this.removePWIMMarketing = this.removePWIMMarketing.bind(this);
    // this.showPWIMMarketing = this.showPWIMMarketing.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
    this.showCallPopUp = this.showCallPopUp.bind(this);
    this.imageViewer = this.imageViewer.bind(this); 
    this.imageZoomer = this.imageZoomer.bind(this); 
    this.handleselectedFile = this.handleselectedFile.bind(this);
    this.showHowContactAdded = this.showHowContactAdded.bind(this);
    this.loadLoginModule = this.loadLoginModule.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.revampHead = this.revampHead.bind(this);
    this.setLastSeen = this.setLastSeen.bind(this);
    this.connectChatUser = this.connectChatUser.bind(this);
    this.setReplyTemplates = this.setReplyTemplates.bind(this);
    this.sendCallMsg = this.sendCallMsg.bind(this);
    this.mountMenuJS = this.mountMenuJS.bind(this);
    this.mountEnqBlComponent = this.mountEnqBlComponent.bind(this);
    this.mountVoiceVernacular = this.mountVoiceVernacular.bind(this);
    this.handleScrollDetail = this.handleScrollDetail.bind(this);
    this.showThreeDotList = this.showThreeDotList.bind(this);
    this.createThreeDotList = this.createThreeDotList.bind(this);
    this.startTyping= this.startTyping.bind(this);
    this.stopTyping= this.stopTyping.bind(this);
    this.addFocus = this.addFocus.bind(this);
    this.checkHotLeadUser = this.checkHotLeadUser.bind(this);
    this.handleCTABack = this.handleCTABack.bind(this);
    this.closeCallPopUp = this.closeCallPopUp.bind(this);
    this.createOrderNowHtml=this.createOrderNowHtml.bind(this);
    this.showPostOrderDetail=this.showPostOrderDetail.bind(this);
    this.showPostOrderPopUpMethod=this.showPostOrderPopUpMethod.bind(this);
    this.getOrderDetails=this.getOrderDetails.bind(this);
    this.reSetOrderDetail=this.reSetOrderDetail.bind(this);
    this.fetchMsgProdDetail=this.fetchMsgProdDetail.bind(this);
    this.initiateOrder=this.initiateOrder.bind(this);
    this.impOrderNow1=this.impOrderNow1.bind(this);
    this.generateOrder=this.generateOrder.bind(this);
    this.showOrderNowPopMethod=this.showOrderNowPopMethod.bind(this);
    this.showOrderNowDetailMethod=this.showOrderNowDetailMethod.bind(this);
    this.getCurrentTime=this.getCurrentTime.bind(this);
    this.showRatingForm=this.showRatingForm.bind(this);
    this.findUserStatus=this.findUserStatus.bind(this);
    this.resetC2cMsg=this.resetC2cMsg.bind(this);
    this.closeAttach=this.closeAttach.bind(this)
    this.checkCallDuration=this.checkCallDuration.bind(this)
    this.showNewCallPopup=this.showNewCallPopup.bind(this)
    this.installAppFooter = this.installAppFooter.bind(this);
    this.handleFocus=this.handleFocus.bind(this);
    this.blockUser = this.blockUser.bind(this);
    this.generateEnquiry = this.generateEnquiry.bind(this);
    this.showKeyboard=this.showKeyboard.bind(this);
    this.handleViewFocus = this.handleViewFocus.bind(this);
    this.keyPadSubmit = this.keyPadSubmit.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.handleFinishEnquiry = this.handleFinishEnquiry.bind(this);
    this.getAutoMsg=this.getAutoMsg.bind(this)
    this.hasPageViewFired = false;
    this.callEnqComponent = false;
    this.isRatEmail = false;
    this.isCountry = true;
    this.enqImg = '';
    this.isCallAlert = false;
    this.threeDotVisible = false;
    this.isEditRate = false;
    this.showRatingComponent = true;
    this.prodImgName = ''
    this.textAlignment = ''
    this.isImgCatalog = false,
    this.showMarketing = false;
    this.isPriceAvail = false;
    this.hitCallPopUp= true;
    this.source = '';
    this.loginType = '';
    this.editId = '';
    self = this;
    this.refs = {};
    this.setRef = this.setRef.bind(this);
    document.addEventListener("onMessageEvent", self.onMessageRecieved);
    document.addEventListener("onNewMessageEvent", self.updateListInBackground);
    document.addEventListener("updateReadEvent", self.updateReadReceipt);
    document.addEventListener("typingEvent",self.startTyping);
    document.addEventListener("stopEvent",self.stopTyping);
    document.addEventListener("hitXmppService",self.XmppServiceHit);
    document.addEventListener("closeVoicePopup",self.closeVoice);
    this.loadLoginModule();
    this.checkHotLead = this.checkHotLeadUser();
    this.uniqueId = new Set();
    this.uniqueCarousel = new Set();
    this.uniqueCall = new Set();
    this.conversationDataFromNative = getWithExpiry("conversationData", this.contact_glid) ? getWithExpiry("conversationData", this.contact_glid) : this.androidWebview && getConversationData(this.contact_glid);
    this.contactDataFromNative = getWithExpiry("contactData", this.contact_glid) ? getWithExpiry("contactData", this.contact_glid) : this.androidWebview && getContactData(this.contact_glid);
    const urlSearchParams = window.location && window.location.search ? new URLSearchParams(window.location.search) : '';
    this.params = {};
    if (urlSearchParams) {
      urlSearchParams.forEach((value, key) => {
        this.params[key] = value;
      });
    }
    document.title = "IndiaMart Messages";
    this.pharmaMCATs = {};
    this.companyTrack = self && self.props && self.props.location && self.props.location.state && self.props.location.state.searchProps && self.props.location.state.searchProps.page && self.props.location.state.searchProps.page == 'company'?true :false;
    this.userMobile = getCookieValByKey('ImeshVisitor', 'mb1');
    this.webViewDataObjNew = this.params && this.params.data && getObjFromArray(location);
    this.msgTrack=this.props && this.props.location && this.props.location.state && this.props.location.state.searchProps?this.props.location.state.searchProps.page+"thankyou":"";
    this.enqActionTrack = this.props && this.props.location && this.props.location.state && this.props.location.state.searchProps ? '-Clicked-PNS' : '';
    this.messengerEnqCard = this.customDescription && window && window.location && window.location.href && !window.location.href.includes('oneTapPDP')
    this.isOnetapNew = (window.location.href.indexOf("OneTapPDP") > -1)||((window.location.href.indexOf("OneTapCOMPANY") > -1)||(window.location.href.indexOf("OneTapMobile") > -1)) ? true : false;
    this.webViewDataObj = (window.location.href.indexOf("TYPageLanding=1") < 0) && location && location.href && location.href.split('&') && location.href.split('&')[2] && location.href.split('&')[2].substring(5) && getObjFromArray(location);
    this.webViewDataObj && this.webViewDataObj.PAGE && this.webViewDataObj.PAGE == "Search" ? this.webViewDataObj.PAGE = "search" : ''
    this.enqLabelTrack = this.webViewDataObj && this.webViewDataObj.PAGE ? (this.webViewDataObj.PAGE == "PDP" || this.webViewDataObj.PAGE == "product-detail" ? "-Enquiry-Thankyou-IMOB_"+this.webViewDataObj.PAGE : '-Enquiry-Thankyou-'+this.webViewDataObj.PAGE ): '-MSG-CALL';
    this.customDescription = this.webViewDataObj && this.webViewDataObj.CustomqDesc ? this.webViewDataObj.CustomqDesc : '';
    this.isNotification = this.props.location.state && this.props.location.state.isNotification
    this.cta_value=this.webViewDataObj&&this.webViewDataObj.REPLY_TEXT?this.webViewDataObj.REPLY_TEXT:''
    this.land_src=this.cta_value&&this.cta_value.includes("photos")?"Askformorephotos":"Needquotation"
    this.appKeyAppend = (this.isOnetapNew && this.webviewUiAbTest) ? '_App' : '';
    this.sectionName = this && this.props && this.props.location && this.props.location.state && this.props.location.state.btnName?'/' + this.props.location.state.btnName:''
    this.trackVal = (window.location.href.indexOf("OneTapPDP") > -1)?'OneTapPDP':(window.location.href.indexOf("OneTapCOMPANY") > -1)?'oneTapCOMPANY':this.webViewDataObj && this.webViewDataObj.queryRef ?'OneTapEnq' + this.webViewDataObj.queryRef.substring(this.webViewDataObj.queryRef.indexOf('-')+1,this.webViewDataObj.queryRef.indexOf('-Ver')):'';
    this.trackVal = this.trackVal+this.sectionName+this.appKeyAppend;
    this.enquiryCardOnce = false;
    this.showWebviewKeyBoard = false;
    this.callReplyFocus = this.isOnetapNew?false:true;
    this.displayID = this && this.props && this.props.location && this.props.location.state && this.props.location.state && this.props.location.state.data && this.props.location.state.data.PC_ITEM_DISPLAY_ID?this.props.location.state.data.PC_ITEM_DISPLAY_ID:this.webViewDataObj && this.webViewDataObj.PC_ITEM_DISPLAY_ID ? this.webViewDataObj.PC_ITEM_DISPLAY_ID:'';
    this.checkEnquirySentOneTap = !checkEnquirySent(this.displayID);
    this.checkIsqFilledOnetap = !checkIsqFilled(this.displayID);
    this.keypadEnter = false;
    this.isqBoxAb = (this.webviewContent || this.webviewUiAbTest)?true:false;
    this.quantityValue = '';
    this.isqBoxViewHandle = this.webViewDataObj && this.checkEnquirySentOneTap?false:true;
    this.showTemplates = this.webviewContent && this.webViewDataObj && !(this.webViewDataObj['FROM'] &&  this.webViewDataObj['FROM'] === "BIZFEED") && this.checkEnquirySentOneTap?false:true;
    this.cta_value_check = this.cta_value?false:true;
    this.c_name = '';
    this.c_city = '';
    this.rcv_num = '';
    this.responseRate = this.props && this.props.location && this.props.location.state && this.props.location.state.responseRate ? this.props.location.state.responseRate : '';
    this.isWebviewBack = false;
    this.isOneTapReq = window.location.href.indexOf("OneTapReq") > -1 ?true:false;
    this.isNewConv = ((window.location.href.indexOf("OneTapEnqSent") > -1) || (window.location.href.indexOf("TYPageLanding") > -1) || (window.location.href.indexOf("OneTapReq") > -1));
    this.finishEnqCalled = true;
    
  }
  // removePWIMMarketing(){
  //   gaTrack.trackEvent(['Messages', 'PWIM_MARKETING_Clicked', this.state.userType, 0, true])
  //   this.setState(
  //     {pwim:false}
  //   )
  //   localStorage.setItem(this.glid+"-pwim",true)
  // }

  handleFinishEnquiry(isWebviewBack=true) {
    this.isWebviewBack = isWebviewBack;
    if (self && self.props && ((self.props.qDestination && self.props.ofr_id) || (self.webViewDataObj && self.webViewDataObj.Enquiry_Id && self.webViewDataObj.Query_Destination)) && this.finishEnqCalled) {
      if ((self.props.qDestination || self.webViewDataObj.Query_Destination) == 1) {
        let params = {
          "query_id": (self.props.ofr_id || self.webViewDataObj.Enquiry_Id),
          "modid": window.navigator && window.navigator.userAgent ? (window.navigator.userAgent.includes('IM-Android_Webview') ? 'ANDWEB' : window.navigator.userAgent.includes('IM-IOS-WebView') ? 'IOSWEB' : 'IMOB') : 'IMOB',
          "query_destination": (self.props.qDestination || self.webViewDataObj.Query_Destination)
        }
        self.props.finishEnquiry(params);
        this.finishEnqCalled = false;
      }
      else{
       isWebviewBack && handleWebViewBack()
      }
    }
    else {
      isWebviewBack && handleWebViewBack()
    }
  }

  generateEnquiry(update_modref='',updatedRefText=false,isIsq=false){
    let stateData = this && this.props && this.props.location && this.props.location.state;
    let oneTapData = stateData && stateData.data?stateData.data:this.webViewDataObj;
    let refURL = stateData && stateData.pdpUrl?stateData.pdpUrl:'';
    let btnName = stateData && stateData.btnName?stateData.btnName:'';
    let description = stateData && stateData.qDesc?stateData.qDesc:this.webViewDataObj && this.webViewDataObj.qDesc?this.webViewDataObj.qDesc:'';
    let refTextPDP = stateData && stateData.queryRef?stateData.queryRef:'';
    let productName = oneTapData && (oneTapData.PC_ITEM_DISPLAY_NAME || oneTapData.PC_ITEM_NAME)?(oneTapData.PC_ITEM_DISPLAY_NAME || oneTapData.PC_ITEM_NAME):this.webViewDataObj.PC_ITEM_DISPLAY_NAME;
    updatedRefText = this.webViewDataObj?this.webViewDataObj.isCompany?'|DoubleClickCompany ':'|DoubleClickPDP ':'|DoubleClickWebView ';
    this.isqBoxViewHandle = true;
    this.showTemplates = true;
    this.cta_value_check = true;
    if(this.checkEnquirySentOneTap){
    oneTapEnquiry(oneTapData,refURL,btnName,update_modref,updatedRefText,'',refTextPDP,description,this.handleFinishEnquiry);
    }
    let msg_query_type = 'W'
      if(this.props.qDestination && this.props.qDestination==2){
        msg_query_type = 'X'
      }
      else if (this.props.qDestination && this.props.qDestination == 3){
        msg_query_type = 'Y'
      }
    if(update_modref == '3' && this.checkEnquirySentOneTap)
    {
      let msg_text = description? description : 'I am interested in ' + productName ;
      let productImgUrl = oneTapData && oneTapData.PC_ITEM_IMG_SMALL?oneTapData.PC_ITEM_IMG_SMALL:'';
      productImgUrl = productImgUrl && {0:{'250x250':productImgUrl}};
      productImgUrl = productImgUrl && JSON.stringify(productImgUrl);
      if(this.state.showOneTapIsq && !this.isqBoxAb)
      {
        this.props.receiveReply('',this.props.ofr_id, msg_query_type, msg_text, this.glid, this.contact_glid, self.state.userType, "right",this.props.ofr_id,'','','ENQ',productImgUrl); 
      }
      if(this.cta_value&&this.state.reply_sent)
      {
        this.props.sendReplyy('', this.props.ofr_id, msg_query_type,
        this.cta_value, this.glid, this.contact_glid, this.checkHotLead, 'details', this.webViewDataObj && this.webViewDataObj.REPLY_SOURCE_ID, getCookieValByKey('ImeshVisitor', 'fn'), getCookieValByKey('ImeshVisitor', 'mb1'), '', 30, '', this.query_ref_text)
        this.setState({reply_sent:false})
        gaTrack.trackEvent(['Messages', `Reply_sent-viawebview-${this.land_src}-PDP`, self.glid, 0, true])
      }      
    }
    this.setState({showOneTapIsq:false,showReplyBox:true,hrzntlTemp:false})
  }

  handleViewFocus(){
    const element = document.getElementById("submitButton")?document.getElementById("submitButton"):'';
    element &&  element.scrollIntoView({block: "end", inline: "nearest" });
  }

  installAppFooter(name,rcv_num,supplier_id){
    let companyCheck = self && self.props && self.props.location && self.props.location.state && self.props.location.state.searchProps && self.props.location.state.searchProps.page && self.props.location.state.searchProps.page == 'company'?true :false;
    let checkForEnquiry= window.location.href.indexOf("TYPageLanding=2") > -1 ?"true":"false";
    return (
      <div className={"df fs16 fw"}>
          {(navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("iPod") != -1 || navigator.userAgent.indexOf("iPad") != -1) ?<span onClick={() => { bannerDeepLinking('Message_Conversation_Banner', '', 'https://m.indiamart.com/messages/contactglid=' + this.contact_glid + '&contactname=' + encodeURIComponent(name) + '&contactnumber=' + rcv_num + '&contactid=' + this.contact_glid), eventTracking('App-Banner-Clicks','Click_dummy',"AfterEnquiry-Search-PWA_1-Messages",false) }} className={`fl tc w50 pdt10 pdb10 mr5 brdrMsgLeft ${companyCheck || checkForEnquiry?'bg2e clrwh br2e':'clr0aa699 bdrmim bgddd'}`}>
          {companyCheck || checkForEnquiry?<i class="aPnIconMsg poa"></i>:''}
              Install App
          </span>:<span onClick={() => { bannerDeepLinking('Message_Conversation_Banner', '', 'https://m.indiamart.com/messages/conversation/?sup_glid=' + supplier_id), eventTracking('Messages', 'App_banner_ThankYou_Footer_old', 'Paid_Seller_Banner') }} className={`fl tc w50 pdt10 pdb10 mr5 brdrMsgLeft ${companyCheck || checkForEnquiry?'bg2e clrwh br2e':'clr0aa699 bdrmim bgddd'}`}>
          {companyCheck || checkForEnquiry?<i class="aPnIconMsg poa"></i>:''}
              Install App
          </span>}
              <span onClick={()=>{history.back();gaTrack.trackEvent(['Messages', `Continuebrowsing_Message-${companyCheck?'Company':'Search'}`, 'ThankYouMessage', 0, true])}} className={`w50 tc fr pdt10 pdb10 ml5 brdrMsgRight ${companyCheck || checkForEnquiry?'br2e cl2e': 'clrw bdrmim bgmim'}`}>
              Continue Browsing
              </span>
      </div>
  )
  }

  showNewCallPopup(flag=false,val)
  {
    if (!self.state.postCallWrapper) {
      import(/* webpackChunkName:"postCallJourney" */'./postCallJourney').then((module) => {
        self.setState({ 'postCallWrapper': module.default });
      });
    }
    if (!flag && !self.state.showOrderNowDetail && !self.state.showMiniCatalog && !self.state.showPostOrderPopUp && !self.state.showOrderNowPop) {
      setTimeout(() => {
        self.setState({ showPostCall: true,showNewCallPopup:val?true:false });
      }, 500);
    }
  }

  showKeyboard()
  {
    if(!this.showWebviewKeyBoard && this.state.showOneTapIsq){
    window.webkit && window.webkit.messageHandlers?window.webkit.messageHandlers.iosBridge?window.webkit.messageHandlers.iosBridge.postMessage("showKeyboard"):'':''
    window.bridge?window.bridge.openKeyboard():''
    this.showWebviewKeyBoard = true;
    return true
    }
  }
  closeAttach(){
    document.getElementById('imgdiv')?document.getElementById('imgdiv').style.display = "none":''; 
  }
  trackFocusEvent(){
    self.state.smsLanding && gaTrack.trackEvent(['Messages', 'Clicked_Replybox', 'EnqDirect', 0, true])
    this.setState({smsLanding: false})
  }
  handleFocus(){
   this.realignTemp()
  }
  trackTouchEvent(){
    self.state && self.state.smsLanding && gaTrack.trackEvent(['Messages', 'TappedConversation', 'EnqDirect', 0, true])
    if(!self.state.ttfbTrack)
    import(/* webpackChunkName:"RUMTracking"*/"../../CentralizePopUp/utility/App/TTFBtracking").then(module=>{module.TTFBtracking(!this.webviewContent?'conversation':'conversation_webview')});
    this.setState({ttfbTrack:true})
  }
  resetC2cMsg(){
    this.props.resetC2cMsg();
  }
  closeCallPopUp(){
    let glidData = {}
    let glids = this.glid + "-" + this.contact_glid
    if(localStorage.getItem("closedCallAlert")){
      glidData = JSON.parse(localStorage.getItem('closedCallAlert'))
      glidData[glids] = new Date();
    }
    else{
      glidData[glids] = new Date(); 
    }
    localStorage.setItem("closedCallAlert",JSON.stringify(glidData))
    this.setState({showCall:false})
  }

  closeVoice() {
    self.setState({VoiceHTML: ''})
  }
  
  getCurrentTime() {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let now = new Date();
    let date = now.getDate();
    if (date >= 0 && date <= 9) {
        date = '0' + date;
    }
    let month = months[now.getMonth()];
    let year = now.getFullYear() + '';
    year = year.slice(2, 4);
    let hours = now.getHours();
    let format = ""
    if (hours >= 0 && hours <= 11) {
        format = " am"
        if (hours >= 0 && hours <= 9) {
            hours = '0' + hours;
        }
    }
    else {
        hours = hours % 12==0?12:hours%12;
        format = " pm"
        if (hours > 0 && hours <= 9) {
            hours = '0' + hours;
        }
    }
    let minutes = now.getMinutes();
    if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes;
    }

    return date + '-' + month + '-' + year + ' ' + hours + ':' + minutes + format
}
  showThreeDotList(){
    if(!this.state.showList){
    gaTrack.trackEvent(['Messages', 'Three_Dot_Clicked', this.state.userType, 0, true])
    this.setState({showList:true})
    }
    else if(this.state.showList){
      this.setState({showList:false})
    }
  }
  closeImgZoomer(){
    document.getElementsByTagName("BODY")[0].style.removeProperty("overflow");
    document.getElementById('msgCbtn')?document.getElementById('msgCbtn').style.display='block':''
    self.setState({imgClicked:false});
    self.prodImgName = ''
    self.enqImg = ''
    self.isImgCatalog = false,
    self.isPriceAvail = false
    self.imageUrl = "";
    self.textAlignment = '';
  }

  blockUser() {
    this.props.blockUser(this.glid, this.contact_glid, 1);
    this.setState({showConfirmPopup: false});
    this.props.location && this.props.location.state ? history.back() : goToRoute('/messages/');
  }

  createThreeDotList(){
    return (
      <div className="mt15 poa msgCbtn1 bxsh33 payNowBtn bgw">
        <ul>
          <li className='pd10' onClick={() => {this.setState({showConfirmPopup: true, showList: false})}}>
            <span className="fw fs16">🚫 Block</span>
            <span className="por fs10 bxrd5 ntp1 bgedd200 pd3 ml5">NEW</span>
          </li>
        </ul>
      </div>
    )
  }
  setRef(dom, eleKey) {
    return this.refs[eleKey] = dom;
  }
  showCallPopUp(){
    let ls = localStorage.getItem("setReplyTime")
    let glids = this.glid + "-" + this.contact_glid;
    let glidData = {}; 
    let help_obj =  {
      'contactglid'  : this.contact_glid,
    };
    var data = [];
    if(ls){
      data = JSON.parse(ls)
      for(let i=0;i<data.length;i++){
        if(data[i].contactglid == this.contact_glid && data[i].time){
          let newTime = new Date();
          let diff =  newTime -  new Date(data[i].time)
          help_obj.timeDiff = Math.floor(diff / (1000 * 60))
          if (diff >= 1800000) {
            if (localStorage.getItem("closedCallAlert")) {
              glidData = JSON.parse(localStorage.getItem('closedCallAlert'))
              if (!glidData[glids]) {
                this.setState({ showCall: true })
              }
              else if (glidData[glids]){
                if(newTime.getDate() != new Date(glidData[glids]).getDate()){
                  this.setState({ showCall: true})
                }
              }
            }
            else {
              this.setState({ showCall: true})
            }
          }
          break;
        }
      } 
    }
  }
  editRating(){
    this.setState({ ratingFormOpen: true });
    //yandexTrackingMultiLevel('Messages','EDIT-RATING-THREAD',this.state.userType);
    if(!this.state.ratingFormMail){
    this.isEditRate = true;
    import(/* webpackChunkName:"ratingFormMail" */'../container/RatingFormContainer').then((module) => {
       this.setState({ ratingFormMail: module.default });
    });
    }
  }
  getAutoMsg = (text)=> {
    setTimeout(()=> {
      this.handleCallMsg(text, false, true)
    }, 500)
  }
  createLocalStorage(){
    let ls = localStorage.getItem("setReplyTime")
    let isData = false
    let help_obj =  {
      'contactglid'  : this.contact_glid,
    };
    var data = [];
    if(ls){
      data = JSON.parse(ls)
      for(let i=0;i<data.length;i++){
        if(data[i].contactglid == this.contact_glid && data[i].time){
          let newTime = new Date();
          help_obj.timeDiff  =  newTime -  new Date(data[i].time)
          help_obj.timeDiff = parseInt((help_obj.timeDiff/(1000*60))%60)
          help_obj.time  = newTime
          data.splice(i,1)
          isData = true;
          break;
        }
      }
      if(!isData){
        let newTime = new Date();
        help_obj.timeDiff = ''
        help_obj.time  = newTime
      }
    }
    else{
      let newTime = new Date();
      help_obj.timeDiff = ''
      help_obj.time  = newTime
    }
    data.push(help_obj)
    localStorage.setItem('setReplyTime',JSON.stringify(data))
  }
  checkHotLeadUser() {
    if (this.props.location && this.props.location.state && this.props.location.state.is_txn_initiator) {
      if (this.props.location.state.is_txn_initiator == 0) {
        return "Seller"
      }
      else {
        return "Buyer"
      }
    }
    else if(window.location.href.indexOf("ASTBUY_SUPP") > -1  || window.location.href.indexOf("ENQ_Direct") > -1){
      return "Seller"
    }
    else {
      return "Buyer"
    }
  }
  componentWillMount() {
    document.getElementById('imPWAHeader') ? document.getElementById('imPWAHeader').classList.remove('srchStickyHeader') : "";
    window.pagename = "Messages"
    this.checkUser();
    this.setState({ rfqid: setRfqData() });
    document.getElementById('root').classList.remove('mt88');
    let localst = JSON.parse(localStorage.getItem("multi_purpose"));
    if (typeof (this.contact_glid) == 'undefined') {
      if (localst && typeof (localst['contact_glid']) != 'undefined') {
        this.contact_glid = localst['contact_glid'];
      } else {
        location.href = '/messages/'
      }

    }
    if (self.handleScrollListing)
      window.removeEventListener("scroll", self.handleScrollListing);
    document.addEventListener("XmppJsloaded", self.connectChatUser);
  }
  revampHead() {
    if (document.getElementById('imPWAHeader')) {
      document.getElementById('imPWAHeader').classList.add('bgw');
      document.getElementById('imPWAHeader').classList.add('hdrShadow');
      document.getElementById('imPWAHeader').classList.remove('ht50');
      document.getElementById('imPWAHeader').classList.remove('bgmim');
      document.getElementById('imPWAHeader').classList.add('z99');
      document.getElementById('imPWAHeader').classList.remove('z9999');
      document.getElementById('imPWAHeader').classList.add('pf');
    }
  }
  getProductDetails(stdId){
    if(!this.state.stdLoaded){
    import(/* webpackChunkName:"StandardProduct" */'./StdPrdData').then((module) => {
      this.setState({ stdLoaded: module.default });
    });
    }
    let serviceUrl = "";
    serviceUrl ="/ajaxrequest/identified/standardProductDetails?displayId=" + stdId;
    document.getElementById('gblLoader').style.display = "block";
    getData("GET", serviceUrl, '').then(
      (result) => {
        document.getElementById("msgCbtn") ? document.getElementById("msgCbtn").style.display="none":''
        document.getElementsByTagName("BODY")[0].style.overflow="hidden";
        if (result.statusText == "ok" && result.response && result.response.DATA ) {
        document.getElementById('gblLoader').style.display = "none";
        gaTrack.trackEvent(["Messages", "StandardPopUpViewed", this.state.userType , 0, true,this.loginType + "-" + this.source])
        this.setState({showPrdDetail:true,PrdData:result.response.DATA})
        }
        else{
          document.getElementById('gblLoader').style.display = "none";
        }
      },
      (error) => {
        document.getElementById('gblLoader').style.display = "none";
      }
    );
  }
  fireTracking(action, link){
    let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
    if(action === "Product Catalog Link" && link) {
      this.webviewContent ? this.handleProductDetailWebView(link) : (this.glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount>=5 && (this.glid == undefined)) || (localStorage.getItem("truecallerimpression") && (this.glid == undefined))) ? goToRoute(link) : window.location.href=(link.replace('www.indiamart.com','m.indiamart.com'));
    }
    gaTrack.trackEvent(["Messages", "InlineLinks" , action , 0, true])
  }
  openMiniCatalog = ()=> {
    if(this.webviewContent) {
      window.location.href= 'https://www.indiamart.com/company/'+this.contact_glid;
      return;
    }
    gaTrack.trackEvent(["Messages", "Catalog_Clicked" , "Catalog_Link" , 0, true]);
    this.impMiniCatalog();
    this.setState({showMiniCatalog: true, popUpClicked: true});
  }
  closeStdProduct() {
    document.getElementsByTagName("BODY")[0].style.removeProperty("overflow");
    document.getElementById('msgCbtn')?document.getElementById('msgCbtn').style.display='block':''
    self.setState({showPrdDetail:false});
  }
  componentWillUnmount() {
    this.handleFinishEnquiry(false);
    window.location.href.indexOf("TYPageLanding=2") > -1 ?history.state=="enq_product"?history.back():"":"";
    window.removeEventListener('click', this.trackTouchEvent)
    window.removeEventListener("popstate",this.handleBack)
    if(this.state && this.state.showCall){
      this.closeCallPopUp()
    }
    this.props.resetDetailProps();
    if (document.getElementById('imPWAHeader')) {
      document.getElementById('imPWAHeader').classList.add('ht50');
      document.getElementById('imPWAHeader').classList.remove('bgw');
      document.getElementById('imPWAHeader').classList.add('bgmim');
      document.getElementById('imPWAHeader').classList.remove('hdrShadow');
      document.getElementById('imPWAHeader').classList.remove('z99');
      document.getElementById('imPWAHeader').classList.remove('pf');
    }
    if(self.updateListInBackground)
    document.removeEventListener("onNewMessageEvent", self.updateListInBackground);
    if (self.updateReadReceipt)
      document.removeEventListener("updateReadEvent", self.updateReadReceipt);
    if(self.startTyping)
      document.removeEventListener("typingEvent",self.startTyping);
    if(self.stopTyping)
      document.removeEventListener("stopEvent",self.stopTyping);
    document.removeEventListener("hitXmppService",self.XmppServiceHit);  
    window.removeEventListener("popstate",self.handleBack);
    window.removeEventListener("closeVoicePopup",self.closeVoice);
    if (window.refUrl)
    window.refUrl.push(this.referencePathName);

  }                                         
  textLink(text,imgCat) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;
    getCookieValByKey("ImeshVisitor","iso")!="IN"?text.includes("https://www.indiamart.com")?text=text.replace("www.indiamart.com","m.indiamart.com"):'':''
    imgCat == "Catalog Link" || imgCat == "Product Catalog" ? text=text.replace(/(<|&lt;)\s*\/*(>|&gt;)/g,' ').replace("<br><br>","<br>") : ''
    replacePattern1 = /(\b(https?|ftps?|http?|ftp?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    let sellerCatalog1 = this.abMiniCat && this.displayIDEnq ? '<div onclick="self.openMiniCatalog()" class="msgLinkCTA fs13 db mt10 mb5 w150px bxrd20 clr008 tc fw truncate" >View Seller Catalog</div> ' : '<a onclick="self.fireTracking(`Seller Catalog Link`)" class="msgLinkCTA fs13 db mt10 mb5 w150px bxrd20 clr008 tc fw truncate" href="$1" target="_self">View Seller Catalog</a> '
    let productDetailWebView1 = this.webviewContent ? '<div onclick="self.fireTracking(`Product Catalog Link`,`$1`)" class="msgLinkCTA fs13 db maMsg mt10 mb5 w160px bxrd20 clr008 tc fw truncate" >View Product Details</div> ' : '<a onclick="self.fireTracking(`Product Catalog Link`,`$1`)" class="msgLinkCTA fs13 db maMsg mt10 mb5 w160px bxrd20 clr008 tc fw truncate" target="_self">View Product Details</a> ';
      if(imgCat == "right")
        replacedText = text.replace(replacePattern1, '<a href="$1" target="_self" style="color:#0072bc;text-decoration:underline">$1</a> ');
      else if(imgCat == "Catalog Link")
        replacedText = text.replace(replacePattern1, sellerCatalog1);
      else if (imgCat == "Product Catalog")
        replacedText = text.replace(replacePattern1, productDetailWebView1);
      else{
        replacedText = text.replace(replacePattern1, '<a href="$1" target="_self" style="color:#0072bc;text-decoration:underline">$1</a> ');
      }
     
    
      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    let sellerCatalog2 = this.abMiniCat && this.displayIDEnq ? '<div onclick="self.openMiniCatalog()" class="msgLinkCTA fs13 mt10 mb5 w150px bxrd20 clr008 tc fw truncate db">View Seller Catalog</div>' : '$1<a onclick="self.fireTracking(`Seller Catalog Link`)" class="msgLinkCTA fs13 mt10 mb5 w150px bxrd20 clr008 tc fw truncate db" href="http://$2" target="_self">View Seller Catalog</a>'
      if(imgCat == "right")
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_self" style="color:#0072bc;text-decoration:underline">$2</a>');     
      else if (imgCat == "Catalog Link")
        replacedText = replacedText.replace(replacePattern2, sellerCatalog2);
      else if (imgCat == "Product Catalog")
        replacedText = replacedText.replace(replacePattern2, '$1<a onclick="self.fireTracking(`Product Catalog Link`)" class="msgLinkCTA fs13 mt10 mb5 maMsg w160px bxrd20 clr008 tc fw truncate db" href="http://$2" target="_self">View Product Details</a>');
      else{
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_self" style="color:#0072bc;text-decoration:underline">$2</a>');       
      }
    return replacedText;
  }
  quotedReply(quoted_text, alignment) {
    /* Date: 4 July,2021, Author: DEEKSHA , Purpose: Implementation of Quoted Reply */
    quoted_text = quoted_text.replace(/\r\n|\n|\r/gm, '');
    quoted_text = quoted_text ? quoted_text : '';
    let quote_close_position = quoted_text.indexOf('```', 3);
    let quoted_string = quoted_text.substring(3, quote_close_position);
    let dsply_msg = quoted_text.substring(quote_close_position + 3, quoted_text.length);

    quoted_string = quoted_string && quoted_string.length > 250 ? quoted_string.substring(0, 250) + "..." : quoted_string;

    let quoted_text_marginbottom = 0;
    ///^<br>/
    if(/^(<br\s*\/?>)+/.test(dsply_msg) && dsply_msg != "<br>"){
      dsply_msg = dsply_msg.replace(/^(<br\s*\/?>)+/,'')
    }
    if (dsply_msg && dsply_msg.length > 0) {
      quoted_text_marginbottom = 10;
    }
    if (dsply_msg == "<br>") {
      dsply_msg = "";
      quoted_text_marginbottom = 0;
    }
    let quoted_text_class = 'disp_re_rply';

    let quoteColor = alignment == "right" ? 'rightCol' : 'leftCol';
    if (quoted_string.trim() == '' || !quoted_string) {
      return '<div style="font-size:14px"><p>' + quoted_text + '</p></div>';
    }
    let rply_html = `<div class="` + quoted_text_class + `" id="` + quoteColor + `" style="margin-bottom:` + quoted_text_marginbottom + `px;><span class="a-tag disp_re_rply_txt" >` + quoted_string + `</span></div>`;
    rply_html += '<div style="font-size:14px"><p>' + dsply_msg + '</p></div>';
    return rply_html;
  }

  sendmsgtemplate(id, tempName,tempValue,e,editable,temp_flag,ThankYouMsg=false) {
    let showStyle = !this.state.hrzntlTemp?'|Vertical|'+this.trackVal:'|Horizontal|'+this.trackVal
    var id1 = id;
    let positionFlag=+(id1.slice(1));
    var msg = document.getElementById(id1).innerText;
    var userType = this.state.userType;
    this.refs['replybox'].setAttribute("rows", "4");
    this.refs['replybox'].value = msg;
    self.setState({ 'desc': this.refs['replybox'].value });
    tempName = tempName.split(' ').join('_');
    this.props.location.state && this.props.location.state.unreadMessages? gaTrack.trackEvent(["Messages", "Reply-Template-Selected-UnreadFilter", tempName + "_" + userType, 0, true,this.loginType + "-" + this.source]) : gaTrack.trackEvent(["Messages", "Reply-Template-Selected-Conversation"+`${ThankYouMsg?this.msgTrack?this.msgTrack:this.companyTrack?'-Companythankyou':'-Searchthankyou':''}`+showStyle, tempName + "_" + userType+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]);
    let suggArr=this.state.randomTemp
    if(suggArr.length>2)
    {
      suggArr=suggArr.filter((val)=>{
      return (val.value!=tempValue)
      })
    this.setState({randomTemp:suggArr})
    }
    this.setState({replyCode:temp_flag},()=>{editable!=''&&editable==1?this.handleChange(e): this.handleSubmit(e,false,this.state.replyCode,positionFlag)})
    
  }
  //Updating Read  Receipt through Mini-Service with XMPP
  updateReadReceipt(e) {
    self.props.updateRead(e.detail.glid, e.detail.contact_glid, 'IMOB',e.detail.message_ref_modid,e.detail.msg_ref_type);
  }
  startTyping()
  {
    this.setState({typingStatus:'typing...'});
    document.getElementById("onlineStatus").style.fontStyle="italic";
  }
  stopTyping(){
    this.setState({typingStatus:'Online'});
    document.getElementById("onlineStatus")?document.getElementById("onlineStatus").style.fontStyle="normal":'';
  }
  showFeedback() {
    self.setState({convRate:true})
      let containerCls = document.getElementById('msgContainer') ? document.getElementById('msgContainer').classList : '';
      let tempCls = document.getElementById('msgCbtn') ? document.getElementById('msgCbtn').classList : '';
      containerCls ? containerCls.remove("msgMc") : '';
      containerCls ? containerCls.add("zIn") : '';
      tempCls ? tempCls.add("dn") : '';
      document.getElementById("msgCbtn") ? document.getElementById("msgCbtn").style.display="none":''
  } 



  hideFeedback(i,val=false) {
    if(self.state.ratTypList)
    {
      self.setState({ratTypList:false})
    }
    if(self.state.rateAfterCall)
    {
      self.setState({rateAfterCall:false})
    }
    if(self.state.listCallRate)
    {
      self.setState({listCallRate:false})
    }
    self.setState({convRate:false})
    self.state.newCallback?self.showNewCallPopup(false,true):''
    self.setState({newCallback:false})
    if(!self.state.postCallRating)
    {
      let containerCls = document.getElementById('msgContainer') ? document.getElementById('msgContainer').classList : '';
      let tempCls = document.getElementById('msgCbtn') ? document.getElementById('msgCbtn').classList : '';
      containerCls ? containerCls.add("msgMc") : '';
      containerCls ? containerCls.remove("zIn"): '';
      tempCls ? tempCls.remove("dn") : ''; 
      document.getElementById("msgCbtn") ? document.getElementById("msgCbtn").style.display="block":''
    }
    (val || this.askForReview) ? '' : self.setState({ 'showRating': false });
    // self.clsClicked(self.contact_glid);
    self.setState({ratingFormMail: '',rating_val:i})
    self.isRatEmail = false;
    self.isEditRate = false;
    self.setState({postCallRating:false})
    document.getElementById('Clrate')?document.getElementById('Clrate').removeEventListener("click",self.hideFeedback):'';
  }



  showHowContactAdded() {
    let messageCount = this.props.message_Detail.length;
    let obj = { message: '', hasMessage: false };
    let contacts_type = (this.props.location.state && this.props.location.state.contacts_type != undefined) ? this.props.location.state.contacts_type : (this.props.get_contdetails && this.props.get_contdetails.contacts_type != undefined) ? this.props.get_contdetails.contacts_type : '';
    let contact_remark = (this.props.location.state && this.props.location.state.contact_remarks != undefined) ? this.props.location.state.contact_remarks : (this.props.get_contdetails && this.props.get_contdetails.result && this.props.get_contdetails.result.contact_type_remarks != undefined) ? this.props.get_contdetails.result.contact_type_remarks : '';
    if(messageCount > 0 && !this.isOnetapNew) {
      if( this.props.message_Detail[messageCount - 1].msg_ref_type === 'ENQ' || this.props.message_Detail[messageCount - 1].msg_ref_type === 'BL' || this.props.message_Detail[messageCount - 1].msg_ref_type === 'C2C' || this.props.message_Detail[messageCount - 1].msg_ref_type === 'RETAIL' || this.props.message_Detail[messageCount - 1].msg_ref_type === 'PNS' || this.props.message_Detail[messageCount - 1].msg_ref_type === 'REPLY' || this.props.message_Detail[messageCount - 1].msg_ref_type === 'BIZ'|| this.props.message_Detail[messageCount - 1].msg_ref_type === 'WHATSAPP') {
        obj.message = contact_remark;
        obj.hasMessage = true;
      }
    }
    return obj;
  }
  removeFocus() {
    if (this.props.imgUpldErr) {
      this.props.resetImgErr();
    }
    if(/(android)/i.test(navigator.userAgent) && navigator.userAgent.indexOf("Firefox") < 0){
    document.getElementById('cameraIcon')?document.getElementById('cameraIcon').classList.remove("dn"):'';
    // document.getElementById('fileIcon')?document.getElementById('fileIcon').classList.remove("dn"):'';
    document.getElementById('fileIcon')?document.getElementById('fileIcon').style.right="105px":'';   
  }
}
  addFocus() {
    if (this.props.imgUpldErr) {
      this.props.resetImgErr();
    }
    document.getElementById("xsserr") && document.getElementById("xsserr").innerHTML != ''  ? document.getElementById("xsserr").innerHTML = '' : '';
    if(/(android)/i.test(navigator.userAgent) && navigator.userAgent.indexOf("Firefox") < 0){
    document.getElementById('cameraIcon')?document.getElementById('cameraIcon').classList.add("dn"):'';
    document.getElementById('fileIcon')?document.getElementById('fileIcon').style.right="73px":'';
  }
}
  XmppServiceHit(){
    self.props.chatUser(self.glid); 
  }
  connectChatUser() {
    isConnected = true;
    // window.initiateRealTimeChatJourney(self.glid);
  }
  mountMenuJS() {
    !self.state.HamburgerMenu ?
      import(/* webpackChunkName:"HamburgerMenu" */'../../Menu/Components/HamburgerMenu').then((module) => {
        self.setState({ HamburgerMenu: module.default });
      })
      : '';
  }

  mountEnqBlComponent() {
    if (!this.state.EnqBlComponent) {
      import(/* webpackChunkName:"EnqBl" */'../../App/components/EnqBlComponent').then((module) => {
        this.setState({ EnqBlComponent: module.default });
      })
    }
  }
  handleVoiceVernacular() {
    document.getElementsByClassName('voiceIconMsg')[0].classList.remove('dn');
    document.getElementsByClassName('voiceIconMsg')[0].addEventListener('click', self.mountVoiceVernacular);
  }
  mountVoiceVernacular() {
    if (!self.state.VoiceHTML) {
      import(/* webpackChunkName:"Voice" */'../../buyer/components/Voicehtml').then((module) => {
        self.setState({ VoiceHTML: module.default });
      })
    }
    document.getElementById('vSrhMain') ? document.getElementById('vSrhMain').style.display = 'block' : '';
  }
  handleCTABack(){
    window.history.replaceState("","","/messages/")
    window.location.reload()
  }
  handleBack(){
  if(self.state && !window.refBack && window.location.href.indexOf("messages")>-1){
      if(checkUserStatus() == 2 ){
        browserHistory.replace("/messages/")
      }
      else {
      window.history.replaceState("","","/")
      window.location.reload()
      }
    }
  }
  loadLoginModule() {
    let userModeN = checkUserStatus();
    let autoLoginconflict = getQueryStringValue('autoLoginconflict');
    let mailerUser = getQueryStringValue('username');
    let loginUser = getCookieValByKey('ImeshVisitor', 'mb1');
    if(((getQueryStringValue('autoidentify') && (userModeN == 0 || userModeN == null)) || (this.props.location.query.sup_glid !== undefined && userModeN != 2) || (autoLoginconflict == 'true' && mailerUser != loginUser)) && !this.state.loginModule){
      import(/* webpackChunkName:"LoginContainer" */'../../Login/container/LoginContainer').then((module) => {
        this.setState({ loginModule: module.default });
      });
    }
  }
  componentDidMount() {
    if(document.body){
      this.observer = new MutationObserver(() => {
        if(this.state.enableScrolling)
        window.scrollTo(0, document.body.scrollHeight); 
      });
      
      document.querySelector("#msgDiv") ? this.observer.observe(document.querySelector("#msgDiv"), {
        subtree: true,
        childList: true,
      }) : '';
    }
    
    if(self.buyerProfileBack){
      this.showTemplates = true;
      this.cta_value_check = true;
    }
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      let page = this.isOnetapNew?this.webViewDataObj?'OneTapConversationMessages|Webview':'OneTapConversationMessages':this.webviewContent ? 'ConversationMessages|Webview':'ConversationMessages';
      eventTracking(page,msg, `${url} | ${lineNo} | ${columnNo}`,true);
      return true;
    }
    document.getElementById('msgHeading') ? document.getElementById('msgHeading').style.display = 'none' : '';
    this.buyerMsgCount = 0;
    document.getElementById("gblLoader") ? document.getElementById("gblLoader").style.display = "none" : "";
    this.uniqueCall.clear();
    if(this.params && this.params.state_name) {   //for Webview
      localStorage.setItem('userState', JSON.stringify(this.params.state_name));
    }
    else if(!localStorage.getItem('userState')) {
      this.props.getDetailOfUser(this.glid);
    }
    if(this.webviewContent)
        {
          const url = (window.location && window.location.href) ? window.location.href : '';
            if(url && url.includes('AskForReview'))
            {
            this.webRatType= getQueryStringValue("rating_type")?getQueryStringValue("rating_type"):''
            this.webRatVal=getQueryStringValue("rating_value")?getQueryStringValue("rating_value"):''
            }
            if(url && url.includes('journey=notification')){
            const parsedUrl = new URL(url);
            const key = parsedUrl.searchParams.get("type");
            const varient = parsedUrl.searchParams.get("varient");
            this.query_ref_text = notificationTrackingMap(key) + `${varient}_AftLand`;
            this.notificationWebview = true;
            }
        }
    this.props.isDisplayRatings(this.contact_glid, this.glid);
    if(this.params && this.params.reply_txt) {
      setTimeout(() => {
      document.getElementById('replybox') ? document.getElementById('replybox').value = this.params.reply_txt.replace(/%20/g, " ") : ''
        document.getElementById('sbmtbtn') && document.getElementById('sbmtbtn').click();
      },500); 
    }
    window.navigator&&window.navigator.userAgent&&window.navigator.userAgent.includes('IM-Android_Webview')?window.bridge?window.bridge.onPageVisible():'':''
    if(getCookieValByKey('ImeshVisitor', 'usts') == 1) {
      this.setState({isFraudUser: true})
    }
    let utm_medium = getQueryStringValue("utm_medium");
    if(utm_medium == "sms"){
      this.setState({smsLanding: true})
    }
    !this.responseRate ? this.props.getResponseRate([this.contact_glid]) : '';
    window.isConversationOpened= false;
    if(this.userMode!=2){
      if(imgtm.length<=1){
      (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "imgtm", "GTM-NR4G");
      }
    }
    if(document.cookie.indexOf("iploc") > -1){
      this.countryName = getCookieValByKey("iploc","gcnnm")
    }
    this.countryName = this.countryName ? this.countryName : 'India'
    setLoginMode();
    if (this.props.location.query !== undefined && this.props.location.query.sup_glid !== undefined  && self.state.prevPage!="contdet" && document.referrer.indexOf('buyer/managebl/') < 0  && (window.location.href.indexOf("utm_source") > -1 || window.location.href.indexOf("isLandingFromEmail") > -1) && !window.refBack) {
      history.pushState({ type: "modifyBack" }, location.pathname, "")
      window.addEventListener("popstate",self.handleBack,{passive:true});
    }
    if(localStorage.getItem("loginMode")){
      let ls = localStorage.getItem("loginMode");
      ls = JSON.parse(ls);
      this.source = ls.Source;
      this.loginType = ls.loginMode
    }
    if(this.isOnetapNew){
      document.getElementById("gblLoader") ? document.getElementById("gblLoader").style.display = "none" : "";
    }
    document.getElementsByClassName('voiceIconMsg') && document.getElementsByClassName('voiceIconMsg')[0] ? this.handleVoiceVernacular() : '';
    if (document.getElementById("replybox")) {
      document.getElementById("replybox").style.height = "49px";
      this.state.isEventBind = true;    
    document.getElementById('replybox').addEventListener("focus", function () {
       setTimeout(function() {
        self.setState({
          ['desc'] : document.getElementById('replybox')&&document.getElementById('replybox').value?document.getElementById('replybox').value:''
        })
      }, 500); 
    });
    document.getElementById("conversationSSRLoader") ? document.getElementById("conversationSSRLoader").style.display = "none" : '';
    }
    if (this.glid > 0 && this.userMode == 2 && getCookie('im_iss') && typeof (this.contact_glid) != 'undefined' && !this.state.isFraudUser) {
      if (this.state && this.state.prevPage == 'contdet') {
        if ((!this.props.message_Detail || this.props.message_Detail.length <= 0)) {
          self.props.fetchMsgdetail(this.glid, this.contact_glid, 0, 30, 'IMOB', false, this.checkHotLead,oneTapEnquiry,this.props.getIsq,this.checkEnquirySentOneTap);
          this.setState({ newHit: true }); this.setState({checkdetail : false});
        }
        self = this;
      } else { 
        self.props.fetchMsgdetail(this.glid, this.contact_glid, 0, 30, 'IMOB', false, this.checkHotLead,oneTapEnquiry,this.props.getIsq,this.checkEnquirySentOneTap);
        this.setState({ newHit: true }); this.setState({checkdetail : false});
      }

      // Fetch seller ratings
      if (this.state.userType == 'Buyer' || (this.state.userType == 'Seller-Free') || window.location.href.indexOf("TYPageLanding=1") > -1  ||  window.location.href.indexOf("TYPageLanding=2") > -1) {
        self.props.fetchRatings(this.glid, this.contact_glid);
        self.props.fetchAvgRating(this.contact_glid);
      }
      this.countryName != 'India' ?  '' : this.props.checkUserSetting(this.contact_glid);
      // Fetch contact detail data
      self.props.fetchContactdetails(this.glid, this.contact_glid, '', this.checkHotLead, self.props.location && self.props.location.state && self.props.location.state.contact_year ? self.props.location.state.contact_year : '');
      // Fetch user last seen
      self.props.getLastSeen(this.contact_glid);
      self.revampHead();
      // import(/* webpackChunkName:"XmppJs" */'../utility/loadXmpp').then((module) => { module.loadXmppJs() });
    }

    // document.getElementById('micon').addEventListener('click', this.mountMenuJS);
    self.loadModules();
    if (typeof sendTyping != 'undefined') {
      document.getElementById("replybox") ? document.getElementById('replybox').addEventListener('input', sendTyping): '';
    }
    this.props.getTemplate(self.glid,"IMOB","0");
    import('../utility/pharmaMCATs.json').then((module) => {
      this.pharmaMCATs = module.default;
    })
    if (window.location&&window.location.href&&window.location.href.indexOf("CompanyPage") > 0) {
      this.handleVoiceVernacular()
    }
  }
  loadModules() {
    import(/* webpackChunkName:"XmppJs" */'../utility/loadXmpp').then((module) => { module.loadXmppJs() });
    import(/* webpackChunkName:"RequestCancelled" */'./requestCancelled').then((module) => {
      self.setState({ reqCanclled: module.default });
    });
  }

  importRatingImages() {
    import(/* webpackChunkName:"RatingImages" */'../popups/RatingImages').then((module) => {
      self.setState({ ratingImgPopup: module.default });
    });
  }

  closeRatingPopUp(){
    self.setState({ratImgClicked:false})
  }
  loadRatingMailForm(){
    if((getQueryStringValue("isLandingFromEmail") == 1 || (window.location.href.includes('AskForReview') || window.location.href.includes('whatsapp'))) && !this.isRatEmail && !window.refBack &&!this.props.isFetching&&!this.props.isFetchingmsgdetail && (this.props && this.props.resCode && this.props.resCode === 200) ){
      this.isRatEmail = true;
      import(/* webpackChunkName:"ratingFormMail" */'../container/RatingFormContainer').then((module) => {
        self.setState({ ratingFormMail: module.default, rating_val: 5, postCallRating: true, newCallback:this.webRatType==12?true:false});
      });
    }    
  }
  imageZoomer(imageSrc,align='',enqImage='',imgCatalog=false,isPrice=false,pdpImgName=''){
    this.setState({imgClicked:true});
    document.getElementById("msgCbtn") ? document.getElementById("msgCbtn").style.display="none":''
    document.getElementsByTagName("BODY")[0].style.overflow="hidden";
    this.imageUrl = imageSrc;
    this.textAlignment = align;
    this.enqImg = enqImage;
    if(imgCatalog){
      this.prodImgName = pdpImgName ? pdpImgName : ''
      this.isImgCatalog = true,
      this.isPriceAvail = isPrice ? isPrice : ''
    }
  }
  imageViewer(imageSrc) {
    gaTrack.trackEvent(['Messages', 'Attachment_clicked', this.glid, 0, true])
    document.getElementById('imgdiv').style.display = "block";
    document.getElementById('imgdiv').className = "ht100 bgw w100 pf tc z99999 tp0 lft0 dpbl";
    var myNode = document.getElementById("imgdiv");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    var node = document.createElement("img"); node.setAttribute("src", imageSrc);
    node.setAttribute("class", "attachViewer");
    var nodeClose = document.createElement("span");
    nodeClose.setAttribute("class", "fr close fs22 poa clr99 bdr bgw bxrd100 pl10 pr10 pdt5 pdb5 mt10 mr10");
    nodeClose.textContent = "✕";
    document.getElementById('imgdiv').appendChild(node);
    document.getElementById('imgdiv').appendChild(nodeClose);
    nodeClose.addEventListener("click", function () {
      document.getElementById('imgdiv').style.display = "none";
      history.back();
    }, false);
    history.pushState({ type: "ImageZoomerAttach" }, location.pathname, "") 
    window.addEventListener("popstate",this.closeAttach, {passive:true})
  }

  sendQuantityMessage(value, unit){ 
    this.autoQuantityMsg = true;
    let timeOut = this.isOnetapNew?1000:500;
    !this.props.singleClickUpdate && this.isOnetapNew && this.generateEnquiry('3',true,true)
    gaTrack.trackEvent(['Messages', 'Submit_ISQ_Conversation', this.checkUser(), 0, true])
    setTimeout(()=> {
      document.getElementById('replybox') ? document.getElementById('replybox').value = "Quantity Required: "+(value)+" "+(unit) : '';
      document.getElementById('sbmtbtn') && document.getElementById('sbmtbtn').click();
    }, timeOut)
    if(this.state.hrzntlTemp){
      this.setState({hrzntlTemp:false,showReplyBox:true});
    }
    this.quantitySent = true;
  }

  enquirySubmit = (e) => {
    e.preventDefault();
    let quantityBox = document.getElementById("entQty");
    quantityBox && quantityBox.value > 0 && quantityBox.value.length && !this.state.isError && (this.setState({ isTextBoxEmpty: false, showIsqQuestion: false }), this.setIsq(quantityBox.value, this.state.quantityUnit), this.sendQuantityMessage(quantityBox.value, this.state.quantityUnit), gaTrack.trackEvent(['Messages', 'SetIsq|' + this.trackVal, this.checkUser() + this.isA2HS, 0, true]))
  }

  createQuestion(data){
    data && data[0] && data[1] ? this.setState({
      selectedUnit1: {
        qId: data[1].qId,
        qDesc: data[1].qDesc,
        qType: data[1].qType,
        isqPriority: data[1].qOptions[0].isqPriority,
      },
      selectedUnit2: {
        qId: data[0].qId,
        qDesc: data[0].qDesc,
        qType: data[0].qType,
        bId: data[0].qOptions[0].optionsId,
        isqPriority: data[0].qOptions[0].isqPriority,
      },
      bId: data[1].qOptions[0].optionsId
    }) : "";
  }

  showQuantityIsq =(data)=>{
    let quantityIsqPriorityCheck = false;
    let stateData = this && this.props && this.props.location && this.props.location.state;
    let oneTapData = stateData && stateData.data?stateData.data:this.webViewDataObj;
    let productName = oneTapData && (oneTapData.PC_ITEM_DISPLAY_NAME || oneTapData.PC_ITEM_NAME)?(oneTapData.PC_ITEM_DISPLAY_NAME || oneTapData.PC_ITEM_NAME):this.webViewDataObj && this.webViewDataObj.PC_ITEM_DISPLAY_NAME;
    let description = stateData && stateData.qdesc?stateData.qdesc:this.webViewDataObj && this.webViewDataObj.qDesc ? this.webViewDataObj.qDesc:'';
    let msg_text = description? description : 'I am interested in ' + productName ;
    let productImgUrl = oneTapData && oneTapData.PC_ITEM_IMG_SMALL?oneTapData.PC_ITEM_IMG_SMALL:'';
    productImgUrl = productImgUrl && {0:{'250x250':productImgUrl}};
    productImgUrl = productImgUrl && JSON.stringify(productImgUrl);
    let msg_query_type = 'W'
    if (this.props.qDestination && this.props.qDestination == 2) {
      msg_query_type = 'X'
    }
    else if (this.props.qDestination && this.props.qDestination == 3) {
      msg_query_type = 'Y'
    }
    data && data[0] && data[0][0] ? 
   data.map((obj,index) => {
     if(data[index][0] && data[index][0].qDesc && data[index][0].qDesc == "Quantity"){
       this.setState({messagesIsq: data[index]})
       this.createQuestion(data[index])
       let unitOptions = data[index][0] && data[index][0].qDesc == "Quantity" && data[index][1] && data[index][1].qDesc == "Quantity Unit" && data[index][1].qOptions;
       unitOptions && unitOptions[0] && unitOptions[0].optionsDesc.length>0 && this.setState({quantityUnit: unitOptions[0].optionsDesc.charAt(0).toUpperCase() + unitOptions[0].optionsDesc.slice(1)})
       gaTrack.trackEvent(['Messages', 'isqViewed'+this.trackVal, this.checkUser(), 0, true]);
       if(data[index][0] && data[index][0].qDesc && data[index][0].qDesc == "Quantity")
       { 
        if(this.cta_value&&this.state.reply_sent&&this.isqBoxAb&&!self.buyerProfileBack)
        {
          this.props.sendReplyy('', this.props.ofr_id, msg_query_type,
          this.cta_value, this.glid, this.contact_glid, this.checkHotLead, 'details', this.webViewDataObj && this.webViewDataObj.REPLY_SOURCE_ID, getCookieValByKey('ImeshVisitor', 'fn'), getCookieValByKey('ImeshVisitor', 'mb1'), '', 30, '', this.query_ref_text)
          this.setState({reply_sent:false})
          gaTrack.trackEvent(['Messages', `Reply_sent-viawebview-${this.land_src}-PDP`, self.glid, 0, true])
        }
        this.setState({showOneTapIsq:true});
        quantityIsqPriorityCheck = true;
       }
     }
   }): this.setState({quantityUnit: "Unit", messagesIsq: ''});
   if(!quantityIsqPriorityCheck && !this.enquiryCardOnce && this.isOnetapNew){
        this.showTemplates = true;
        this.isqBoxViewHandle = true;
        this.checkEnquirySentOneTap && !this.isqBoxAb &&this.props.receiveReply('','','C', msg_text, this.glid, this.contact_glid, self.state.userType, "right",this.props.ofr_id,'','','ENQ',productImgUrl);
        this.enquiryCardOnce = true;
        if(this.cta_value && this.state.reply_sent && !self.buyerProfileBack)
        {
          this.props.sendReplyy('', this.props.ofr_id, msg_query_type,
          this.cta_value, this.glid, this.contact_glid, this.checkHotLead, 'details', this.webViewDataObj && this.webViewDataObj.REPLY_SOURCE_ID, getCookieValByKey('ImeshVisitor', 'fn'), getCookieValByKey('ImeshVisitor', 'mb1'), '', 30, '', this.query_ref_text)
          this.setState({reply_sent:false})
          gaTrack.trackEvent(['Messages', `Reply_sent-viawebview-${this.land_src}-PDP`, self.glid, 0, true])
        }
        
   }
 }
  componentWillUpdate(nextProps) {
    if(nextProps.message_Detail && nextProps.message_Detail.length > 30) {
      this.observer.disconnect();
    }
    if(this.state.checkdetail){
    this.glid =  getCookieValByKey('ImeshVisitor', 'glid');
    this.userMode = checkUserStatus()
    }
    if(document.cookie.indexOf("iploc") > -1 && this.isCountry){
      this.isCountry = false
      this.countryName = getCookieValByKey("iploc","gcnnm")
      if (this.countryName != 'India') {
        import(/* webpackChunkName:"momentJs" */'moment-timezone').then((module) => {
          this.setState({ momentJS: module.default });
        })
      }
    }
    this.countryName = this.countryName ? this.countryName : 'India'
    if (nextProps.authenticated && this.userMode == 2 && this.glid > 0 && this.state.checkdetail && getCookie('im_iss')) {
      this.state.isFraudUser = (getCookieValByKey('ImeshVisitor', 'usts') == 1) ? true : false;
      if (!this.state.isFraudUser) {
        // import(/* webpackChunkName:"XmppJs" */'../utility/loadXmpp').then((module) => { module.loadXmppJs() });
        window.addEventListener("scroll", this.handleScrollDetail, {passive:true});
        this.setState({checkdetail:false}); self = this; 
        if ((this.props.location.query !== undefined && this.props.location.query.sup_glid !== undefined)) {
          this.countryName != 'India' ? '' : this.props.checkUserSetting(this.contact_glid) ;
          this.props.fetchContactdetails(this.glid, this.contact_glid, '', this.checkHotLead, this.props.location && this.props.location.state && this.props.location.state.contact_year ? this.props.location.state.contact_year : '');
          this.props.fetchMsgdetail(this.glid, this.contact_glid, 0, 30, 'IMOB', false, this.checkHotLead);
          this.props.getLastSeen(this.contact_glid);
          if (this.checkUser() == 'Buyer' || (this.checkUser() == 'Seller-Free') || window.location.href.indexOf("TYPageLanding=1") > -1 || window.location.href.indexOf("TYPageLanding=2") > -1)  {
            this.props.fetchRatings(this.glid, this.contact_glid);
            this.props.fetchAvgRating(this.contact_glid);
          }
          this.checkUser();
          this.loadRatingMailForm();
          this.setState({ newHit: true });
          this.revampHead();
        }
      }
    }
  }

  isFullyLogged(){
    let userModeN = checkUserStatus();
    let autoIdentify = getQueryStringValue('autoidentify');
    let autoLoginconflict = getQueryStringValue('autoLoginconflict');
    let mailerUser = getQueryStringValue('username');
    let loginUser = getCookieValByKey('ImeshVisitor', 'mb1');
    if(userModeN != 2 || (autoIdentify == true && (userModeN == 0 || userModeN == null)) || (autoLoginconflict == 'true' && mailerUser != loginUser)){
      return false;
    } else {
      return true;
    }
  }


  componentDidUpdate(prevProps) {
    if (this.props.get_contdetails && typeof this.props.get_contdetails.result != 'undefined' && !this.contactDataSaved){
      this.webviewContent && saveContactData(this.contact_glid, this.props.get_contdetails);
      saveWithExpiry("contactData", this.props.get_contdetails, this.contact_glid);
      this.contactDataSaved = true;
    }
      if(this.isOnetapNew && !this.state.showAppBanner && this.userSentMsg && this.userCalled && !this.webviewContent) {
        this.setState({showAppBanner: true, hrzntlTemp: true});
      }
      else if(!this.isOnetapNew && !this.state.showAppBanner && !this.webviewContent && (this.userSentMsg || this.userCalled)) {
        this.setState({showAppBanner: true, hrzntlTemp: true});
      }
    if (this.customDescription && !this.querySent) {
      let queryType = 'W'
      if(this.props.qDestination && this.props.qDestination==2){
        queryType = 'X'
      }
      else if (this.props.qDestination && this.props.qDestination == 3){
        queryType = 'Y'
      }
      this.props.sendReplyy('', this.props.last_transaction_id, queryType,
              this.customDescription, this.glid, this.contact_glid, this.checkHotLead, 'details', this.state.rfqid, getCookieValByKey('ImeshVisitor', 'fn'), getCookieValByKey('ImeshVisitor', 'mb1'),'',30,'', this.query_ref_text);
      this.querySent = true;
    }
    if(!this.state.userState && localStorage.getItem('userState')) {
      let userState = JSON.parse(localStorage.getItem('userState'));
      userState ? this.setState({userState: userState}) : '';
    }
    if(this.props.isqData !== prevProps.isqData){
      this.showQuantityIsq(this.props.isqData.data);
    }
    if(this.props.message_Detail !== prevProps.message_Detail){
      setTimeout(() => {
        this.handleViewFocus()
      },0);
    }
    if(this.state.showBubbleChat){
    setTimeout(()=> {
      this.setState({showBubbleChat: false})
    }, 2000)
    }
    let abVirtual = window.location.href.indexOf("TYPageLanding=2") > -1 ?this.msgTrack?this.msgTrack:this.companyTrack?'/companythankyou': '/searchthankyou': '';
    if(window.location.href.indexOf("TYPageLanding=2") > -1 && self.props.resCode == 204){
      abVirtual = abVirtual + '/datanotfound';
    }
    document.getElementById('imPWAHeader') ? document.getElementById('imPWAHeader').classList.remove('srchStickyHeader') : "";
    let dataNotFoundTrack = '';
    if(self.props.resCode == 204){
      dataNotFoundTrack = dataNotFoundTrack + '/datanotfound';
    }
    let show_rate_form=localStorage.getItem('rate_form')
    if(localStorage.getItem("ratingFormVisible")&&!this.state.closeRating&&!this.props.isFetching&&!this.props.isFetchingmsgdetail||(!this.state.closeRating&&!this.props.isFetching&&!this.props.isFetchingmsgdetail&&show_rate_form))
    {
        this.showRatingForm(true)
        this.setState({closeRating:true})
        show_rate_form?this.setState({listCallRate:true}):this.setState({ratTypList:true})
        localStorage.getItem('newCallBack')?this.setState({newCallback:true}):'';
        localStorage.removeItem("ratingFormVisible")
    }
    if(!this.hasPageViewFired && this.isFullyLogged() && !this.props.messageUnreadList && self.props.resCode){
      this.props.location.state && this.props.location.state.unreadMessages? trackPVForMessages(window.location.pathname+'unreadmessages' + (window.autoLogin ? '/AutoLogin' : '')+(this.webviewContent?'||webview page':''), 'Indiamart Mobile Site - Messages') : trackPVForMessages(window.location.pathname + (window.autoLogin ? 'AutoLogin' : '')+this.trackVal+(this.webviewContent?'||webview page':'')+abVirtual+(this.customDescription ? '/Messenger_Widget' : ''), 'Indiamart Mobile Site - Messages',abVirtual)
      this.hasPageViewFired = true;
    }
    if(!this.threeDotVisible && this.props.privacyId && this.props.privacyId==57){
      this.threeDotVisible = true;
      gaTrack.trackEvent(["Messages", "ThreeDotsVisble", this.state.userType, 0, true,this.loginType + "-" + this.source]);
    }
    if(this.props.message_Detail && this.props.message_Detail.length>0 && this.hitCallPopUp){
      this.hitCallPopUp = false
      if (this.props.message_Detail[0] && this.props.message_Detail[0].msg_alignment && this.props.message_Detail[0].msg_alignment == "right" && this.props.message_Detail[0].msg_ref_type != 'PNS' && this.props.message_Detail[0].msg_ref_type != 'C2C') {
        this.showCallPopUp();
      }
    }
    if(this.props.message_Detail && this.props.message_Detail.length>0 && !this.conversationDataSaved){
      this.displayIDEnq = '';
      this.androidWebview && saveConversationData(this.contact_glid, this.props.message_Detail);
      saveWithExpiry("conversationData", this.props.message_Detail, this.contact_glid);
      this.conversationDataSaved = true;
    }
    if(this.state.showCall && !this.isCallAlert){
      this.isCallAlert = true; 
      gaTrack.trackEvent(['Messages', 'IntelligentCall_Alert', 'IntelligentCall_Alert_Visible', 0, true])
    }
    if(this.state.ratingFormMail){
      if(!self.state.postCallRating){
        let containerCls = document.getElementById('msgContainer') ? document.getElementById('msgContainer').classList : '';
        containerCls ? containerCls.remove("msgMc") : '';
        containerCls ? containerCls.add("zIn") : '';
      }  
    }
    
      if(this.state.userType == 'Seller-Paid' && !this.callEnqComponent){
      this.mountEnqBlComponent();
      this.callEnqComponent = true;
    }
    document.getElementById("fltldng") &&  document.getElementById("fltldng").style.display == "block" ? document.getElementById("fltldng").style = "display:none" : "";
    document.getElementById("notify-visitors-push-confirm-popup") && document.getElementById("notify-visitors-push-confirm-popup").style.display != "none" ? document.getElementById("notify-visitors-push-confirm-popup").style.display = "none" : ''
    document.getElementById("Centralised_PopUp")  && document.getElementById("Centralised_PopUp").style.display!="none"?  document.getElementById("Centralised_PopUp").style.display="none" : ''
    if(this.props.isRatingDisplay && this.showRatingComponent){
    this.showRatingComponent = false;
      import(/* webpackChunkName:"feedbackForm" */'../container/FeedbackFormContainer').then((module) => {
      self.setState({ feedbackForm: module.default });
      });
    }
    if (typeof connection != 'undefined' && connection != null && typeof ACTIVE_GLID !== "undefined" && ACTIVE_GLID !== undefined && ACTIVE_GLID !== null && ACTIVE_GLID !== '') {
      if(document.getElementById("onlineStatus") && document.getElementById("onlineStatus").classList.contains("dn")){
        if (ACTIVE_GLID.includes(this.contact_glid)) {
        let el = document.getElementById("onlineStatus");
        let lstSeen = document.getElementById("lastSeenDiv");
        lstSeen ? lstSeen.classList.add("dn") : "";
        el ? el.classList.remove("dn") : "";
        } else {
          if (this.state.hitPresense && typeof (getPresence) == "function") {
            window.getPresence(this.contact_glid.toString() + '@chat.indiamart.com')
            this.setState({ hitPresense: false })
          }
        }
      }
    }
    var tot = this.props.to;
    var idd = this.props.to - 60;
    let isDataFromNative = (!(this.props.message_Detail && this.props.message_Detail.length > 0) && this.conversationDataFromNative) ? true : false;
    if (this.props.replySent && document.getElementById('reply0') && this.isqBoxViewHandle) {
      document.getElementById('reply0').scrollIntoView();
      setTimeout(function () {
        document.getElementById("div1") ? document.getElementById("div1").style.display = "none" : '';
        document.getElementById("msg_attach0_0") ? document.getElementById("msg_attach0_0").style = "display:block;max-width:100%;max-height:250px" : '';
      }, 3000)
    }

    if (document.getElementById('replybox') && !this.state.isEventBind) {
      this.state.isEventBind = true;
    }
    document.getElementById('msgContainer') ? 
    document.getElementById('msgContainer').addEventListener("click", function () 
    { 
      self && self.state && self.state.showList ? self.setState({showList : false}) : ''
    }) : '';
    if (this.props.imgUpldErr) {
      document.getElementById("xsserr") ? document.getElementById("xsserr").innerHTML = this.props.imgUpldErrReason : '';
      document.getElementById("xsserr") ? document.getElementById('xsserr').setAttribute('style', 'display:block; color:red;') : '';
    }
    if (this.props.get_contdetails && typeof this.props.get_contdetails.result != 'undefined' && this.props.get_contdetails.result.is_fraud == 1 && !this.state.isCntctFraud) {
      this.showFraudAlert();
      this.setState({ isCntctFraud: true });
    }
    if (this.props.message_Detail&&this.props.message_Detail.length < 6) {
      let msgDiv = document.getElementById('msgDiv');
      let header = document.getElementById('imPWAHeader');
      //(msgDiv && header && (msgDiv.getBoundingClientRect().top < header.offsetHeight - 1)) ? window.scrollTo(0, 1) : '';
    }
    if (self.props.resCode == 200 && this.props.message_Detail && this.props.message_Detail.length == 1 && this.state.showStrip === '' && (getQueryStringValue('TYPageLanding') == 1 || getQueryStringValue('TYPageLanding') == 2)) {
      this.setState({ showStrip: true });
    }
    else if(self.props.resCode == 204 && window.location.href.indexOf("TYPageLanding=2") > -1 && this.state.showStrip === ''){
      this.setState({ showStrip: true });
    }
    if (this.props.message_Detail && typeof this.state.mlStatus == 'string' && !this.props.receivedSuggReply) {
      this.props.suggestedReplies(this.glid,this.contact_glid)
      this.setState({ 'mlStatus': true});
    } else if ((this.props.receivedSuggReply && this.props.suggestiveReply.length == 0) && this.state.mlStatus != false) {
      this.setState({ 'mlStatus': false });
    }
    this.loadRatingMailForm()
    if (!(this.webviewContent) && !this.state.verifyBlocker) {
      import(/* webpackChunkName:"RestrictionBlockerContainer" */'../../VerificationBlockerNew/container/BlockerContainer').then((module) => {
        self.setState({ verifyBlocker: module.default });
      });
    }
    if(this.webviewContent&&this.state.webCall)
    {
      let journey=getQueryStringValue('journey');
      journey&&journey.includes("_call")?this.showNewCallPopup():''
      this.setState({webCall:false})
    }
    document.getElementById("gblLoader") ? document.getElementById("gblLoader").style.display = "none" : "";
    if(this.cta_value && this.state.custReply)
    {
      setTimeout(()=>{trackPVForMessages(window.location.pathname + this.land_src + 'PDP' +(this.webviewContent?'||webview page':''),'Indiamart Mobile Site - Messages')
      },500)
      this.setState({custReply:false})
    }
    if(localStorage.getItem('chatNowReply')&&!this.props.isFetching&&!this.props.isFetchingmsgdetail&&!this.state.chatNowReplySent)
    {
      this.getAutoMsg(localStorage.getItem('chatNowReply'))
      this.setState({chatNowReplySent:true})
      localStorage.removeItem('chatNowReply')
    }
    document.getElementById("conversationSSRLoader") ? document.getElementById("conversationSSRLoader").style.display = "none" : '';
  }
  showFraudAlert() {
    gaTrack.trackEvent(["Messages", "FraudAlertDisplay", 'Default Alert', 0, true,this.loginType + "-" + this.source]);
    alert('Be Aware! This user has been removed from IndiaMART. Please don’t communicate with this user in any form.');
  }
  loadMoreRowsDetail() {
    if (this.props.hasMoreItems && getCookie('im_iss')) {
      this.props.fetchMsgdetail(this.glid, this.contact_glid, this.props.from, this.props.to, 'IMOB', true, this.checkHotLead);

    }
  }
  checkUser() {
    let uType = getCookieValByKey('ImeshVisitor', 'utyp');
    let user;
    if (this.userMode != 0 && uType == "P")
      user = "Seller-Paid";
    if (this.userMode != 0 && uType == "F")
      user = "Seller-Free";
    if (this.userMode != 0 && uType == "N")
      user = "Buyer";
    this.setState({ userType: user })
    return user;
  }

  handleScrollDetail(e) {
    var body = document.body;
    let msgContheight = document.getElementById('msgContainer') ? document.getElementById('msgContainer').scrollTop : 0;
    var scrollT = window.pageYOffset || body.scrollTop || msgContheight || 0;
    if (scrollT < 2000) {
      if (self.props&&!self.props.isFetching && typeof (self.loadMoreRowsDetail) == "function" && getCookieValByKey('ImeshVisitor', 'glid') > 0 && self.userMode == 2 && getCookie('im_iss') && !self.state.isFraudUser && !self.state.ratingFormMail && window.location.pathname != '/messages/contactdetail/') { //to avoid multiple request 
        self.loadMoreRowsDetail();
      }
    } 
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var textar = document.getElementById("replybox");
    var txt = textar.value;
    var nextLine = txt.replace(/(.{28})/g, "$1\n");
    var matches = nextLine.match(/[\n]/g);
    if (document.getElementById('replybox').value.trim() == "") {
      self.removeFocus();
      this.setState({isTextBoxEmpty: true})
    } else {
      self.addFocus();
      this.setState({isTextBoxEmpty: false})
    }
    if (matches) {
      if (matches.length < 2) {
        document.getElementById("replybox").style.height = "49px";
      }
      else if (matches.length == 2) {
        document.getElementById("replybox").style.height = "69px";
      }
      else if (matches.length == 3) {
        document.getElementById("replybox").style.height = "89px";
      }
      else if (matches.length >= 3) {
        document.getElementById("replybox").style.height = "120px";
      }
    } else {
      document.getElementById("replybox").style.height = "49px";
    }


    self.setState({
      [name]: value
    });
  }
  realignTemp() {
    if (!this.state.hrzntlTemp) {
      this.setState({ hrzntlTemp: true });
      document.getElementsByClassName('msgMc')[0].classList.remove("pdb180");
      document.getElementsByClassName('msgMc')[0].classList.add("pd100");
    }
  }
  handleCallMsg(msg, fromMiniPDP=false, fromContactDetail=false){
    if (self.state.showStrip === true) {
      self.setState({ showStrip: false });
    }
    this.qType = this.props.query_Type ? this.props.query_Type : 'C'
    this.qId = this.props.last_transaction_id ? this.props.last_transaction_id : '1'
    self.createBubbleChat();
    this.createLocalStorage();
    if(this.state && this.state.showCall){
      this.closeCallPopUp();
    }
    let code = (fromMiniPDP || fromContactDetail) ? 10 : 30;
    this.props.sendReplyy('', this.qId, this.qType,
              msg, this.glid, this.contact_glid, this.checkHotLead, 'details', self.webviewContent&&self.isNotification?70:self.state.rfqid, getCookieValByKey('ImeshVisitor', 'fn'), getCookieValByKey('ImeshVisitor', 'mb1'),'',code, '', this.query_ref_text);          
    self.setState({ 'desc': '', showIsqQuestion: false});
  }
  handleSubmit(event,flag = true,replyCode,positionFlag=false) {
    if(this.isOnetapNew) {
      this.quantitySent && !this.autoQuantityMsg ? this.userSentMsg = true : this.autoQuantityMsg = false;
    }
    else {
      this.userSentMsg = true;
    }
    let ThankYouMsg = window.location.href.indexOf("TYPageLanding=2") > -1;
    if (!window.navigator.onLine) {
      alert('Oops! Your internet connection does not seems to be working. Please check your network and try again.');
      this.addFocus();
      return;
    }
    if(this.state.ratingFormOpen == true)
    {
      this.setState({ratingFormOpen: false})
    }
    var Code=5;
        if(this.state.templateCode)
        {
          Code=this.state.templateCode;
        }
        else if(replyCode==30) 
        {
          Code=replyCode
        }
       else if(!this.state.templateCode && this.state.replyCode)
       {
         Code=this.state.replyCode;
       }
       
    if(event)
    event.preventDefault();
    document.getElementById("xsserr") && document.getElementById("xsserr").innerHTML != ''  ? document.getElementById("xsserr").innerHTML = '' : '';
    if(document.getElementById('replybox').value==''){
      document.getElementById("xsserr") ? document.getElementById("xsserr").innerHTML = 'Reply can not be blank!' : '';
      document.getElementById("xsserr") ? document.getElementById('xsserr').setAttribute('style', 'display:block; color:red;') : '';
    }
    if (this.state['desc'].trim() || document.getElementById('replybox').value) {
      if (this.props.imgUpldErr) {
        this.props.resetImgErr();
      }
      var post_data = [this.state['desc']] || document.getElementById('replybox').value.trim();
      let msg_txt = flag ? (this.state['desc'].trim() || document.getElementById('replybox').value.trim()) : (document.getElementById('replybox').value.trim() || this.state['desc'].trim() ) ;
      if (msg_txt.trim() == '') {
        document.getElementById('replybox').value = '';
        document.getElementById("xsserr") ? document.getElementById("xsserr").innerHTML = 'Please enter valid message' : '';
        document.getElementById("xsserr") ? document.getElementById('xsserr').setAttribute('style', 'display:block; color:red;') : '';
      } else {
        this.props.createTemplate(self.glid,'IMOB',"Last Reply",msg_txt,0)
        var xsscheck = doxssHandling(post_data);
        if (xsscheck && xsscheck.code != 200) {
          document.getElementById("xsserr") ? document.getElementById("xsserr").innerHTML = xsscheck.message : '';
          document.getElementById("xsserr") ? document.getElementById('xsserr').setAttribute('style', 'display:block; color:red;') : '';
        } else {
          document.getElementById("xsserr") ? document.getElementById("xsserr").innerHTML = '' : '';
          document.getElementById("xsserr") ? document.getElementById('xsserr').setAttribute('style', 'display:none; color:red;') : '';
          if (flag) {
            this.props.location.state && this.props.location.state.unreadMessages? gaTrack.trackEvent(['Messages', 'Reply_Sent_UnreadFilter', this.checkUser(), 0, true,this.loginType + "-" + this.source]) : gaTrack.trackEvent(["Messages", 'Reply_Sent'+`${ThankYouMsg?this.msgTrack?this.msgTrack:this.companyTrack?'-Companythankyou':'-Searchthankyou':''}`+this.trackVal+(this.customDescription?'/Messenger_Widget' : ''), this.checkUser()+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]);
          }
          msg_txt = msg_txt.replace(/<[^>]*>/g, '');  //For stripping HTML tags from the string
          this.createBubbleChat(flag);
          if(document.getElementById("msgCall") && document.getElementById("sbmtbtn")){
            document.getElementById("msgCall").classList.remove("dn")
            document.getElementById("sbmtbtn").classList.add("dn")
          }
          if (this.state.showStrip === true) {
            this.setState({ showStrip: false });
          }
          document.getElementById("replybox").style.height = "49px";
          this.qType = this.props.query_Type ? this.props.query_Type : 'C'
          this.qId = this.props.last_transaction_id ? this.props.last_transaction_id : '1'
          let name = getCookieValByKey('ImeshVisitor', 'fn');
          let mobile = getCookieValByKey('ImeshVisitor', 'mb1');
          name = name ? name : self.props.TC_Name ? self.props.TC_Name : ''
          this.setState({showIsqQuestion: false})
          if(this.props.location && this.props.location.state && this.props.location.state.contact_year){
            this.props.sendReplyy('', this.qId, this.qType,
              msg_txt, this.glid, this.contact_glid, this.checkHotLead, 'details', this.webviewContent&&this.isNotification?70:this.state.rfqid, name, mobile,this.props.location.state.contact_year,Code,positionFlag, this.query_ref_text);
          }
          else if(this.params && this.params.reply_txt) {
            this.props.sendReplyy('', this.params.qry_id, this.params.qry_typ, msg_txt, this.glid, this.contact_glid, this.checkHotLead, 'details', this.params.rfq_src_id, name, mobile,'', this.params.tmp_flg, positionFlag, this.query_ref_text);
          }
          else{
            this.props.sendReplyy('', this.qId, this.qType,
              msg_txt, this.glid, this.contact_glid, this.checkHotLead, 'details',this.webviewContent&&this.isNotification?70:this.state.rfqid, name, mobile,'',Code,positionFlag, this.query_ref_text);
          }
          if(this.state.showCall){
            this.closeCallPopUp();
          }
          this.createLocalStorage();
          this.setState({ 'desc': ''});
        }
      }
      let currTime=this.getCurrentTime()
      let msg_arr ={"message": msg_txt, "person_id": parseInt(self.glid), "msg_align": "right","type":"Reply","time":currTime,"duration":"None"}
      // this.props.suggestedReplies(this.glid,this.contact_glid);
      this.setState({lastmsg:msg_txt})

    }
      this.removeFocus();
      this.setState({templateCode:''}); 
      this.setState({replyCode:''}); 
      document.getElementById('replybox').value = '';
  }

  createBubbleChat(flag) {
    this.setState({isTextBoxEmpty: true})
    if(flag && this.callReplyFocus){
    document.getElementById("replybox") ? document.getElementById("replybox").focus() : ''
    }
    var ul = document.getElementsByClassName("eq")[0];
    var li = document.createElement("li");
    li.setAttribute('class', 'lh18 crb por wr msgCn padd8 eqright fr b-dot');
    var lihtml = li.appendChild(document.createElement("div"));
    lihtml.innerHTML = '<div class="dLoad tc"> <div class="b1 bgmim"></div><div class="b2 bgmim"></div><div class="b3 bgmim"></div></div>';
    ul.appendChild(li)
    this.callReplyFocus = true;
  }
  checkCallDuration(e) {
    let time=new Date();
    localStorage.setItem("SetCallConv",time);
    let visibilityChange, visibilityState;
    if (typeof document.visibilityState !== 'undefined') {
      visibilityChange = 'visibilitychange';
      visibilityState = 'hidden';
    } else if (typeof document.mozHidden !== 'undefined') {
      visibilityChange = 'mozvisibilitychange';
      visibilityState = 'mozVisibilityState';
    }
    document.addEventListener(visibilityChange, newFun)
    function newFun() {
      let lsData = (localStorage.getItem("SetCallConv"));
      if (lsData) {
        if (!document[visibilityState]) {
          let oldTime = new Date(lsData);
          let t = new Date();
          let diff = (t.getTime() - oldTime.getTime()) / 1000
          let name=self.props.get_contdetails&&self.props.get_contdetails.result&&self.props.get_contdetails.result.contacts_name ? self.props.get_contdetails.result.contacts_name : ''
          if (diff > 60) { 
            let msgTxt = 'Hi ' + name + ',Thanks for talking to me.Looking forward to do business with you.'
          self.setState({ desc: msgTxt.trim()},() => self.handleSubmit(e,false,30));
          gaTrack.trackEvent(['Messages', 'Call-Completed', 'Conversation_MoreOneMin', 0, true])
          gaTrack.trackEvent(['Messages', 'Reply-Template-Selected-PostCallPopUp-Rating', self.state.userType+this.enqLabelTrack, 0, true])
          self.showRatingForm(true)  
          self.setState({newCallback:true})    
          }
          else {
            self.showNewCallPopup()
          }
          localStorage.setItem("callDuration", callDurationBucket(diff));
          localStorage.removeItem("SetCallConv");
          document.removeEventListener(visibilityChange, newFun)
        }
    }
  }
}  
  clickToCall(mobile, gluserId, PNS, MODID, pagetype,e,click_at,section='') {
    if(this.isOnetapNew){
      pagetype= 'MSG-CONVERSATION-PAGE-ONETAPENQ'+section+(this.webviewUiAbTest ? '_App' : '');
    }
    if(this.ThankYouMsg && !this.userCalled) {
      pagetype = this.enqLabelTrack && this.enqLabelTrack.slice(1);
    }
    let journey=getQueryStringValue('journey');
    let webViewPage = "MSG-CONVERSATION-PAGE" + (journey=='notification'||this.isNotification ? "-NOTIFICATION" : "");
    click_at = click_at +'_' +this.trackVal
    saveCallDuration(mobile, gluserId, PNS,this.webviewContent? webViewPage : pagetype,self)
    self.checkCallDuration(e);
    let q_type = self.props.isWType && self.props.last_transaction_id ? "W" : self.props.isBType && self.props.last_transaction_refid ? "B" : "";

    let transaction_id = self.props.isWType && self.props.last_transaction_id ? self.props.last_transaction_id : self.props.isBType && self.props.last_transaction_refid ? self.props.last_transaction_refid : "";
    let modrefType = this.ThankYouMsg && !this.userCalled ? '5' : '';
      
    let notificationPageType = this.notificationWebview ? webViewPage + '_' + this.query_ref_text : webViewPage;
    self.props.addC2CtrackMsg(mobile, gluserId, PNS, this.webviewContent ? notificationPageType : pagetype, transaction_id, q_type,'','',click_at, '', '', modrefType)
    if(this.isOnetapNew) {
      this.quantitySent && !this.autoQuantityMsg ? this.userCalled = true : this.autoQuantityMsg = false;
    }
    else {
      this.userCalled = true;
    }
    this.ThankYouMsg ? this.enqLabelTrack = '' : '';
    if(self.state.showCall){
      self.closeCallPopUp();
    }
    if (self.props.imgUpldErr) {
      self.props.resetImgErr();
    }
  }
  timeformatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var am_pm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours.toString().padStart(2, "0") + ':' + minutes + ' ' + am_pm;
    return strTime;
  }

  dateformatslash(date) {
    return (date.getDate()) + "/" + (date.getMonth() + 1) + "/" + (date.getYear() + 1900);
  }

  removeVal(locStoRep, glid) {
    for (var property in locStoRep) {

      if (locStoRep[property].glid == glid) {
        return property
      }
    }
  }

  decode(str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  }
  handleselectedFile(event) {
    var formData = new FormData();
    var fileInput = document.getElementById('image');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.doc|\.docx|\.ppt|\.pptx|\.txt|\.pdf|\.xls|\.xlsx|\.csv)$/i;
    var fileName = event.target.files[0];
    var qType = this.props.query_Type ? this.props.query_Type : 'C'
    var qId = this.props.last_transaction_id ? this.props.last_transaction_id : '1'
    if (!allowedExtensions.exec(filePath) && fileInput.value !== '') {
      alert('Please upload file having extensions\n .jpeg/.jpg/.png/.gif/.doc/.ppt/.pdf/.xlx/.csv only.');
      fileInput.value = '';

    }

    else if (event.target.files[0]['name'].length > 100) {
      alert('File name cannot have more than 100 characters.\n');
      fileInput.value = '';
    }
    else {
      let imgExt = fileName['name'];
      imgExt = imgExt.split('.')[1];
      if (imgExt == 'jpg' || imgExt == 'jpeg' || imgExt == 'gif' || imgExt == 'png' || imgExt == 'JPG' || imgExt == 'JPEG' || imgExt == 'GIF' || imgExt == 'PNG') {
        new Compressor(event.target.files[0], {
          quality: 0.6, maxWidth: 1920, maxHeight: 1920,
          success(result) {            
            formData.append('IMAGE', result, result.name);
            let imgName = fileName['name'];
            imgName = imgName.split('.');
            imgName[0] = imgName[0] + '_' + new Date().getTime();
            imgName = imgName.join('.');
            let name = self.props.orderContactInfo && self.props.orderContactInfo.glusr_usr_firstname && self.props.orderContactInfo.glusr_usr_lastname ? self.props.orderContactInfo.glusr_usr_firstname + " " + self.props.orderContactInfo.glusr_usr_lastname : getCookieValByKey('ImeshVisitor', 'fn');
            formData.append('IMAGE_NAME', imgName);
            self.createLocalStorage();
            if(self.state && self.state.showCall){
              self.closeCallPopUp()
            }
            self.props.uploadImage(formData, "message", self.state.reply.details['subject'], qId, qType, self.state['desc'], self.glid, self.contact_glid, self.checkHotLead, self.state.rfqid, self.props.location && self.props.location.state && self.props.location.state.contact_year ? self.props.location.state.contact_year : '',name);
            document.getElementById("xsserr") && document.getElementById("xsserr").innerHTML != '' ? document.getElementById("xsserr").innerHTML = '' : '';
          },
          error(err) {
            
          },
        })
      }
      else {
        formData.append('IMAGE', event.target.files[0]);
        let imgName = fileName['name'];
        imgName = imgName.split('.');
        imgName[0] = imgName[0] + '_' + new Date().getTime();
        imgName = imgName.join('.');
        let name = self.props.orderContactInfo && self.props.orderContactInfo.glusr_usr_firstname && self.props.orderContactInfo.glusr_usr_lastname ? self.props.orderContactInfo.glusr_usr_firstname + " " + self.props.orderContactInfo.glusr_usr_lastname : getCookieValByKey('ImeshVisitor', 'fn');
        formData.append('IMAGE_NAME', imgName);
        self.props.uploadImage(formData, "message", self.state.reply.details['subject'], qId, qType, self.state['desc'], self.glid, self.contact_glid, self.checkHotLead, self.state.rfqid, self.props.location && self.props.location.state && self.props.location.state.contact_year ? self.props.location.state.contact_year : '',name);
        document.getElementById("xsserr") && document.getElementById("xsserr").innerHTML != '' ? document.getElementById("xsserr").innerHTML = '' : '';
      }
    }
    !this.props.singleClickUpdate && this.isOnetapNew && this.generateEnquiry('3',true);
    event.target.value = null;
  }

  shuffle(array, key) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    array.unshift(key);
    this.setState({ randomTemp: array });
  }
  setCatalogLink()
  {
    let CatalogValue="Thank you for showing interest in our products and contacting us. Please find my Catalog Link:"
    CatalogValue=self.props.orderContactInfo&&self.props.orderContactInfo.freeshowroom_url?CatalogValue + self.props.orderContactInfo.freeshowroom_url:CatalogValue
    return CatalogValue
  }
  setReplyTemplates(data, flag = false) {
    let array = [];
    for (let j = 0; j < data.length; j++) {
      let is_editable=data[j].one_click?0:1
      if(j>=6)
      {
        continue;
      }
      array[j] = { 'key': data[j].label, 'value': data[j].label!="Catalog Link"?data[j].response:this.setCatalogLink(),"is_editable" :is_editable,"temp_flag":data[j].temp_flag}
    }
    this.setState({ randomTemp: array, mlStatus: false }); 

  }
  setReplyLoaders() {
    let tempArr = [0, 1, 2];
    this.setState({ loaderTemp: tempArr });
  }
  onMessageRecieved(e) {
    // self.setState({isMsgRecieved:true})
    let data = JSON.parse(e.detail);
    if(data['SERVICENAME']=='Enquiery_service'){
      self.props.receiveReply(data);
    }
    else{
    let msg_query_id = data.msg_query_id,
      msg_query_type = data.msg_query_type,
      msg_ref_type=data.msg_ref_type,
      msg_text = data.msg_text,
      msg_sender_id = data.msg_sender_id,
      msg_receiver_id = data.msg_receiver_id,
      msg_reply_id = data.message_id,
      msg_sub = data.msg_sub,
      is_ask_for_review_initiated = data.msg_alignment && data.msg_alignment === "left" && data.msg_text && data.msg_text.includes("We hope you had an amazing experience with us. Don't forget to provide a quick review.") ? 1 : 0;
    let attach_array = data.msg_attach;
    let usr_glid = self.glid
    if (data.msg_sender_id == usr_glid) {
      if (!data.msg_attach || data.msg_attach.length == 0)
      self.props.receiveReply(msg_sub, msg_query_id, msg_query_type, msg_text, msg_sender_id, msg_receiver_id, self.state.userType, "right", msg_reply_id, "", "");
      else if(data.msg_attach && data.msg_attach.length > 0)
      self.props.receiveReply(msg_sub, msg_query_id, msg_query_type, msg_text, msg_sender_id, msg_receiver_id, self.state.userType, "right", msg_reply_id, attach_array);
    }
    if ((!data.msg_attach || data.msg_attach.length == 0) && data.msg_sender_id != usr_glid) {
      self.props.receiveReply(msg_sub, msg_query_id, msg_query_type, msg_text, msg_sender_id, msg_receiver_id, self.state.userType, "left", msg_reply_id, "", is_ask_for_review_initiated);
      let filter_msg = stripHtml(msg_text);
      filter_msg = filter_msg.replace(/\n/g, "\\\\n");
      let currTime=self.getCurrentTime()
      let rcv_msg_array = { "message": filter_msg, "person_id": parseInt(msg_sender_id), "msg_align": "left","type":msg_ref_type.slice(0,1)+msg_ref_type.slice(1).toLowerCase(),"time":currTime,"duration":data.msg_call_duration?data.msg_call_duration:"None"};
      self.props.suggestedReplies(self.glid,self.contact_glid);
        self.setState({ 'mlStatus': true});
    }
    if (data.msg_attach && data.msg_attach.length > 0 && data.msg_sender_id != usr_glid) {
      msg_text ? msg_text :  "Please find the attachment";
      self.props.receiveReply(msg_sub, msg_query_id, msg_query_type, msg_text, msg_sender_id, msg_receiver_id, self.state.userType, "left", msg_reply_id, attach_array);
    }
  }
  }
  updateListInBackground(e){
    if(self.props.messages && self.props.messages.length > 0){
      let data = JSON.parse(e.detail);
      let cid = data.msg_sender_id?data.msg_sender_id:data.contacts_glid,
        msg = data.msg_text?data.msg_text:data.last_message,
        contact_last_product = data.contact_last_product?data.contact_last_product:"",
        last_contact_date_view = data.last_contact_date_view?data.last_contact_date_view:'',
        last_contact_date = data.last_contact_date?data.last_contact_date:'',
        new_list = self.props.messages,
        x = [];
      let contact_name = data.msg_sender_name?data.msg_sender_name:data.contacts_name?data.contacts_name:'';
      let contact_number = data.msg_sender_contact_number?data.msg_sender_contact_number:data.contacts_mobile1?data.contacts_mobile1:'';
      for (let i = 0; i < new_list.length; i++) {
        if (new_list[i].contacts_glid == cid) {
          new_list[i].unread_message_cnt = new_list[i].unread_message_cnt > 0 ? parseInt(new_list[i].unread_message_cnt) + 1 : "1";
          x.push(new_list[i]);
          new_list.splice(i, 1);
          contact_last_product = contact_last_product?contact_last_product:new_list[i].contact_last_product;
          last_contact_date_view = last_contact_date_view ? last_contact_date_view : new_list[i].last_contact_date_view;
          last_contact_date = last_contact_date?last_contact_date:new_list[i].last_contact_date;
          break;
        }
      }
      if(x.length>0){
      x[0].last_message = msg;
      x[0].contact_last_product=contact_last_product;
      //x[0].unread_message_cnt = "1";
      x[0].last_contact_date_view = last_contact_date_view;
      x[0].last_contact_date = last_contact_date;
      new_list = x.concat(new_list);
      if (self.props.messages !== undefined) {
        self.props.receiveList(new_list);
      }
      }
      else{
        let new_contact_list = self.props.messages;
        var details_obj = {
        contacts_glid: cid,
        contacts_mobile1: contact_number,
        contacts_mobile2: null,
        contacts_name: contact_name,
        last_contact_date_view: last_contact_date_view?last_contact_date_view:"Just Now",
        unread_message_cnt: "1",
        last_contact_date: last_contact_date?last_contact_date:"2020-05-05 17:11:22.328",
        last_message: msg,
        contact_last_product: data.contact_last_product?data.contact_last_product:"...",
      }
    new_contact_list = new_contact_list.reverse();
    new_contact_list = new_contact_list.concat(details_obj);
    new_contact_list = new_contact_list.reverse();
    if (self.props.messages !== undefined) {
      self.props.receiveList(new_contact_list);
    }
    }
    var ls = JSON.parse(localStorage.getItem('reply_details')); 
    if (ls) {
      for(var property in ls){
        if(ls[property].glid==cid){
            ls.splice(property,1);
            localStorage.setItem("reply_details",JSON.stringify(ls));
        }
      }
    }
  }  
  }
  formatLastSeen(timels, datels) {
    var userTimeZoneName = this.state.momentJS.tz.guess();
    var timezoneAbrr = this.state.momentJS.tz(userTimeZoneName).zoneAbbr();
    const regex = /\d/;
    var target12=`${timels}`;
    timels=this.state.momentJS(target12, ' h:m:s A').format(' HH:mm:ss');
    let x=datels.split('-');
    datels=`${x[0]}/${x[1]}/${x[2]}`;    
    var ls = new Date(`${datels} ${timels} GMT+0530`); //----------------earlier    
    if (regex.test(timezoneAbrr)) 
    {
      var zone = ls.toTimeString().match(/\((.+)\)/)[1];
      timezoneAbrr = zones[zone];
    }
    if (!timezoneAbrr) {
      timezoneAbrr = '';
    }
    var timel = this.timeformatAMPM(ls);
    var datel = ls.getDate();
    var monNum = ls.getMonth();
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var mon = month[monNum];
    var year = ls.getFullYear();
    var short_year=year.toString().substr(-2);
    var localYear=new Date().getFullYear();
    
    var string;
    var Today = new Date();
    Today.setDate(Today.getDate() - 1);
    if (ls.toLocaleDateString() == new Date().toLocaleDateString) {
      string = `last seen Today at ${timel} ${timezoneAbrr}`;
    }
    else if (ls == Today) {
      string = `last seen Yesterday at ${timel} ${timezoneAbrr}`;
    } else {
      if(year==localYear)
    {
      string = `last seen on ${datel} ${mon} at ${timel} ${timezoneAbrr}`; // current year string
    }
    else{
      
      string = `last seen ${datel} ${mon}' ${short_year} at ${timel} ${timezoneAbrr}`; //
    }
      
    }
    return string;
  }
  setLastSeen(){
    let lastSeen = "";
    if (this.props.lastSeen.hasOwnProperty('LastSeen')) {
        lastSeen = this.props.lastSeen && this.props.lastSeen.LastSeen ?  this.props.lastSeen.LastSeen : "Last seen few days ago";
    }
    else {
      lastSeen = "Last seen few days ago";
    }
    return lastSeen;
  }

  createProductViewHtml = (prodName, prodImage, text, align, time, replyPos, replyNumber, readStatus, rcv_num, contact_number_type,ThankYouMsg=false)=> {
    let productView = <li id={"reply" + replyNumber}>
    <div className="lh18 crb por wr msgCn pd5 eqCenter mw100 eqShadow">
      <div className="flxCntr df gap10">
        <div className='fl w100px pdt4 flxShr0 tc'>
      <img src={prodImage&&prodImage.replace(/http:/i, 'https:')} width="90" height="90" className="maxw90px maxh90px" onClick={() => { this.imageZoomer(prodImage ? prodImage.replace(/http:/i, 'https:') : '', align, prodName) }}/>
        </div>
      <div className="df flxcol gap10 w100">
        <p className='db fw fs16'>{prodName}</p>
        <p>{text}</p>
        {(rcv_num) &&
                          <a onClick={(e) => { this.clickToCall(rcv_num, this.contact_glid, contact_number_type, 'IMOB', 'CALL-BACK-NOTIFICATION'+`${ThankYouMsg?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH':''}`+this.enqLabelTrack,e,'Message_Center_Follow_Up_WebView'+(this.customDescription?'-Messenger_Widget' : ''),'-Followup') }} href={(rcv_num) ? 'tel:' + rcv_num : ''} key="mb">
                            <div className="fs12 fw bxrd20 clrw tc truncate padd8 lh13 bgmim w36 fr bxsh33">Follow Up</div>
                          </a>}
      </div>
      </div>
    </div>
    <div class="fr fs11 crb">
        {align == "right" ? (readStatus == '-1' || readStatus == '-2' || readStatus== '-3') ?
          <i className="fr pdl5">{blueTick}</i>
          : <i className="fr pdl5">{greyTick}</i> : ''}
        <time class="fs10 clra0">{time}</time>
      </div>
    </li>

    return productView;
  }
  fetchMsgProdDetail(display_id)
  {
    this.props.fetchMsgProdDetail(display_id)
  }
  reSetOrderDetail()
  {
    this.props.reSetOrderDetail();
  }
  getOrderDetails(order_id)
  {
   this.props.getOrderDetails(order_id,this.glid)
  }
  showPostOrderPopUpMethod=(value)=>
  {
    this.setState({showPostOrderPopUp:value});
  }
  showOrderNowPopMethod(value)
  {
    this.setState({showOrderNowPop:value});
  }

  showOrderNowDetailMethod(value){
    this.setState({showOrderNowDetail: value, viewDetailsMiniPDP: false})
  }
  
  showMiniCatalogMethod = (value)=> {
    this.setState({showMiniCatalog: value});
  }

  handlePostOrderWebView = (orderDetail)=> {
    if(this.webviewContent){
      window.location.href = 'https://www.indiamart.com/orderdetail/?orderid='+orderDetail.response.order_id+'&displayid='+orderDetail.response.product_id;
      this.setState({showPostOrderPopUp: false});
    }
    return true;
  }

  handleProductDetailWebView = (link) => {
    window.location.href = link
  }
  showPostOrderDetail() {
    import(/* webpackChunkName:"PostOrderJourney" */'../container/PostOrderDetailContainer').then((module) => {
      this.setState({ postOrderDetail: module.default });
    });  
 }

 impOrderNow1(prodName,newPrice,display_id,imageSrc,unit,mcatId)
 {
  if(this.webviewContent){
    handleOrderAttWebview(prodName,newPrice,display_id, this.contact_glid,imageSrc,unit,mcatId)
    return;
  }
  import(/* webpackChunkName:"OrderNowJourney" */'../container/OrderNowContainer').then((module) => {
    this.setState({ OrderNow_1: module.default });
  });
 }

 impOrderNow2 =(display_id)=>{
  if(this.webviewContent){
    window.location.href = 'https://www.indiamart.com/proddetail/'+display_id+'.html';
    return;
  }
  import(/* webpackChunkName:"MiniPDP_Messages" */'../container/OrderNowDetailsContainer').then((module) => {
    this.setState({ OrderNow_2: module.default });
  });
 }

 impMiniCatalog = ()=>{
  import(/* webpackChunkName:"MiniCatalog" */'../container/MiniCatalogContainer').then((module) => {
    this.setState({miniCatalog: module.default})
  })
 }

 generateOrder(productId,productName)
 {
  let gip=getCookieValByKey('iploc','gip');
  let receiver_glid=this.props.get_contdetails.result.contacts_glid;
  this.props.generateOrder(this.glid,receiver_glid,productId,productName,gip,this.props.last_mcat_id)
}


initiateOrder(imgUrl,align,msgText,readStatus,time,mcatId)
{
    if(!msgText) return;
    let width = (((window.innerWidth - 30) * 0.75) - 16);
    let prodName = msgText.substring(0,msgText.indexOf('Price'));
    let productPrice  = msgText.indexOf('http') > -1 ? msgText.substring(msgText.indexOf('Price'),msgText.indexOf('http')) : msgText.substring(msgText.indexOf('Price'));
    let productUrl = msgText.substring(msgText.indexOf('http'));
    
    let productName=<div className='fs18  mt5 truncate fl' >{prodName}</div>;
    let regex = /[+-]?\d+(\.\d+)?/g;
    let Price=productPrice.match(regex)[0];
    let regexInt=/(\d+)(?=\.html)/g;
    let productId= productUrl.indexOf('http') > -1 ? productUrl.match(regexInt)[0] : '';
    this.displayID = productId;
    let new00=<span className='fs12'>{(((+Price)%1).toFixed(2)+'').replace('0','')}</span>
    let unit=productPrice.substr(6).replace('INR','')&&productPrice.substr(6).replace('INR','').split('(')[0].split('/')[1]&&productPrice.substr(6).replace('INR','').split('(')[0].split('/')[1];
    if(!this.uniqueId.has(productId)){
      this.props.getMoreRelatedProducts(4, productId);
      this.uniqueId.add(productId);
    }
    
    let orderNow = <li className={(align == 'left' ? 'maxw75 crb fl' : 'maxw75 crb fr')}>
      <div className={'lh18 crb por wr msgCn padd8 ' + (align == 'left' ? 'eqleft' : 'eqright')}>
        <div className='msgText fs18 less-show tc'>
          {productName}
        </div>
        <div className='dif' style={{ 'width': width + 'px', 'height': width + 'px' }}>
          <img className="odrNowImg objftmsg" onClick={() => {this.impOrderNow2(productId),this.setState({ orderProdName: prodName, orderProdImg: imgUrl ? imgUrl : 'https://m.imimg.com/gifs/background_image.jpg',productPrice:Price,showOrderNowDetail:true,unit:unit,prodID:productId,orderImageClicked:true,popUpClicked:true}),this.fetchMsgProdDetail(productId), gaTrack.trackEvent(['Messages','Order_Now_Image_Click',this.glid,0, true])}} src={!imgUrl? 'https://m.imimg.com/gifs/background_image.jpg' : imgUrl.replace(/http:/i, 'https:')} />
        </div>
        {Price ? <div className='mr3 mb6'>
          <span className='nomsg dib'>Price :</span><span className='fr tr dib mxw60 clr33 less-show truncate'>{'₹ ' + Price.split('.')[0].replace(' ','')}{new00} /{unit}</span>
        </div> : ''}
        {productPrice.substr(6).replace('INR','').split('(')[1]?<div className='fs12 clr777 tr'>{productPrice&&'('+productPrice.substr(6).replace('INR','').split('(')[1]}</div>:''}
        <div onClick={() => {this.impOrderNow1(prodName,Price,productId,imgUrl,unit,mcatId),this.webviewContent?'':this.generateOrder(productId,prodName),this.setState({ orderProdName: prodName, orderProdImg: imgUrl ? imgUrl : 'https://m.imimg.com/gifs/background_image.jpg',productPrice:Price,showOrderNowPop:true,unit:unit,popUpClicked:true, prodID: productId}),this.fetchMsgProdDetail(productId),gaTrack.trackEvent(['Messages','Order_Now_Btn_Click-Order_Now',this.glid,0, true])}} className='tc bgmim fs14 less-show clrw pd10 m8_0'>Order Now</div>
      </div>
      <div className='fr fs11 crb'>
        {(readStatus == '-1' || readStatus == '-2' || readStatus == '-3') ?
          <i className="fr pdl5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="15" height="15"><path fill="#2980B9" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i>
          : <i className="fr pdl5"><svg viewBox="0 0 16 15" width="15" height="15"><path fill="#999999" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i>}
        <time class="fs10 clra0">{time}</time>
      </div>
    </li>

    return orderNow;
  }

  relatedProducts = (displayID, isCatalog = '', fromOrder = false)=> {
    if(!this.uniqueCarousel.has(displayID)){
      isCatalog == 'Catalog Link' ? gaTrack.trackEvent(['Messages', 'Top_Products Visible', 'Catalog', 0, true]) : gaTrack.trackEvent(['Messages', 'Top_Products Visible', 'PDP_Paid', 0, true]);
      this.uniqueCarousel.add(displayID);
    }
    this.detailsRelated = this.props.get_more_relatedproducts && this.props.get_more_relatedproducts[displayID] && this.props.get_more_relatedproducts[displayID].Data && this.props.get_more_relatedproducts[displayID].Data[0] && this.props.get_more_relatedproducts[displayID].Data[0].RELATED_PRODUCTS;
    let showTopProducts = this.detailsRelated && this.detailsRelated.map(item => item.PRICE_F ? true : false);
    let products = this.detailsRelated && showTopProducts.includes(true) && <li className='crb'>
      <h4 className={isCatalog == 'Catalog Link' ? 'fs15 pdt6' : 'fs15'}>Top Products from this seller</h4>
      <div className='df divScroll csb mb10 ml5 mt10'>
        {this.detailsRelated.map(item => item.PRICE_F && this.pharmaMCATs.mcatIDs && !this.pharmaMCATs.mcatIDs.includes(toString(item.BRD_MCAT_ID)) && <div onClick={()=> {this.impOrderNow2(item.PC_ITEM_DISPLAY_ID),this.setState({ orderProdName: item.BRD_MCAT_NAME, orderProdImg: item.PC_IMG_SMALL_600X600?item.PC_IMG_SMALL_600X600:item.PC_ITEM_IMG_SMALL,productPrice:item.FOB_PRICE,showOrderNowDetail:true,unit:item.PC_ITEM_MOQ_UNIT_TYPE,prodID:item.PC_ITEM_DISPLAY_ID, fromOrder: fromOrder,popUpClicked: true}),this.fetchMsgProdDetail(item.PC_ITEM_DISPLAY_ID),isCatalog == 'Catalog Link' ? gaTrack.trackEvent(['Messages', 'Top_Products Clicked', 'Catalog', 0, true]) : gaTrack.trackEvent(['Messages', 'Top_Products Clicked', 'PDP_Paid', 0, true])}} className='df h50 br5 mr5 bgw'>
          <img className='br5 w50p ht50p' src={item.PC_IMG_SMALL_100X100&&item.PC_IMG_SMALL_100X100.replace(/http:/i, 'https:')} />
          <div className='df flxcol w100px pdl5 pdr5 justContAround'>
            <p className='fs12 mxHt30 wb oh fw'>{item.BRD_MCAT_NAME}</p>
            <p className='fs11 clr80 truncate'>{item.PRICE_F ? item.PRICE_F : ''}</p>
          </div>
        </div>)}
      </div>
    </li>

    return products;
  }

  createSystemMsg = (msg,time)=> {
    let msgObj = JSON.parse(msg);
    let systemMsg = <li className='crb'>
          <div className='pdt10 mAuto mw240p'>
          <div className='br10 pd10 bgffeecd feedbckBanner'>
              <p className='tc'>{msgObj.message_text}</p>
          </div>
          <div className='pdt5'>
          <time class="fs10 clra0 fr pdr5">{time}</time>
          </div>
          </div>
        </li>
    return systemMsg;
  }

  createOrderNowHtml(msg,msgQType,align,imgUrl,time,prodName,order_id,readStatus,display_id){ //create Order Now HtML
    let msgObj=JSON.parse(msg);
    let imageUrlVariants=imgUrl && JSON.parse(imgUrl);
    let orgstatus =msgObj && msgObj.additional_details&&msgObj.additional_details["Original status"];
    let Quantity =msgObj && msgObj.additional_details&& msgObj.additional_details.Quantity;
    let Price =msgObj && msgObj.additional_details&& msgObj.additional_details.Price && msgObj.additional_details.Price.slice(3);
    let newPrice =Price && Price.split('/')[0];
    let unit = Price && Price.split('/')[1];
    let TotalAmount =msgObj && msgObj.additional_details&& msgObj.additional_details["Total Amount"] && msgObj.additional_details["Total Amount"].replace('.00','');
    let Location =msgObj && msgObj.additional_details&& msgObj.additional_details.Location;
    let deliveryMode =msgObj && msgObj.additional_details&& msgObj.additional_details["Delivery mode"];
    let deliveryTime =msgObj && msgObj.additional_details&& msgObj.additional_details["Delivery time"];
    let deliveryCharges =msgObj && msgObj.additional_details&& msgObj.additional_details["Delivery charges"];


    let width = (((window.innerWidth - 30) * 0.75) - 16);
    let imageSrc = !imageUrlVariants?'https://m.imimg.com/gifs/background_image.jpg':imageUrlVariants["500x500"]?imageUrlVariants["500x500"]:imageUrlVariants["250x250"] ? imageUrlVariants["250x250"] : imageUrlVariants["125x125"] ? imageUrlVariants["125x125"] : 'https://m.imimg.com/gifs/background_image.jpg';
    
    let productName=<div className='fs15 fwn mt5 truncate fl w100 tc' >{prodName}</div>  
    let new00=<span className='fs12'>{(((+newPrice)%1).toFixed(2)+'').replace('0','')}</span>
    let newt00=<span className='fs12'>{(((+TotalAmount)%1).toFixed(2)+'').replace('0','')}</span>
    let orderNowData= <li className={ (align == 'left' ? 'maxw75 crb fl' : 'maxw75 crb fr')}>
    <div>
      <div className={'lh18 crb por wr msgCn padd8 '+(align=='left'?'eqleft':'eqright')}>
        <div className='msgText fs18 less-show tc'>
        {orgstatus?<div>Order {orgstatus} {productName}</div>:<div>Order Attempted {productName}</div>}
        </div>
        <div className='dif' style={{'width':width+'px','height':width+'px'}}>
        <img className="odrNowImg" onClick={() => {this.impOrderNow2(display_id),this.setState({ orderProdName: prodName, orderProdImg: imageSrc,productPrice:newPrice,unit: unit,showOrderNowDetail:true,prodID:display_id,popUpClicked:true,unit: unit}),orgstatus && this.setState({viewDetailsMiniPDP: true}),this.fetchMsgProdDetail(display_id), gaTrack.trackEvent(['Messages','Order_Now_Image_Click',this.glid,0, true])}} src={imageSrc&&imageSrc.replace(/http:/i, 'https:')}/>
        </div>
        {newPrice&&Price?<div className='mr3 mb6 dfr'>
        <span className='nomsg  dib'>Price :</span><span className='fr tr dib mxw60 clr33'>{' ₹'+ newPrice.split('.')[0]}{new00} /{Price.split('/')[1]}</span>
        </div>:''}
        {Location?<div className='mr3 mb6 dfr'>
        <span className='nomsg  dib'>Location :</span><span className='fr tr dib mxw60 clr33'>{' '+ Location}</span>
        </div>:''}
        {Quantity?<div className='mr3 mb6 dfr'>
        <span className='nomsg  dib'>Quantity :</span><span className='fr tr dib mxw60 clr33'>{' '+ Quantity}</span>
        </div>:''}
        {TotalAmount?<div className='mr3 mb6 dfr'>
        <span className='nomsg  dib'>Total Amount :</span><span className='fr tr dib mxw60 clr33'>{' ₹'+ TotalAmount.split('.')[0]}{newt00}</span>
        </div>:''}
        {deliveryTime?<div className='mr3 mb6 dfr'>
        <span className='nomsg  dib'>Delivery Time :</span><span className='fr tr dib mxw60 clr33'>{' '+ deliveryTime}</span>
        </div>:''}
        {deliveryCharges?<div className='mr3 mb6 dfr'>
        <span className='nomsg  dib'>Delivery Charges :</span><span className='fr tr dib mxw60 clr33'>{' ₹'+ deliveryCharges}{new00}</span>
        </div>:''}
        {deliveryMode?<div className='mr3 mb6 dfr'>
        <span className='nomsg  dib'>Delivery Mode :</span><span className='fr tr dib mxw60 clr33'>{''+window.innerWidth<360?deliveryMode.substr(0,12)+'...':deliveryMode.substr(0,16)+'...'}</span>
        </div>:''}
       
        
        {msgObj&&msgQType&&msgQType!='OT'&&<div onclick={()=>{this.setState({showPostOrderPopUp:true,MsgAlign:align,orderProdName:prodName,orderProdImg:imageUrlVariants['500x500']?imageUrlVariants['500x500']:imageUrlVariants['250x250'],orgSts:orgstatus,popUpClicked:true}),this.showPostOrderDetail(),this.getOrderDetails(order_id),this.fetchMsgProdDetail(display_id),gaTrack.trackEvent(['Messages','View_Details_Btn_Click-View_Details-Order_Now',this.glid,0, true])}} className='tc bgmim fs14 less-show clrw pd10 m8_0'>View Details</div>}
        </div>
        <div className='fr fs11 crb'>
        {(readStatus == '-1' || readStatus == '-2' || readStatus== '-3') ?
          <i className="fr pdl5">{blueTick}</i>
          : <i className="fr pdl5">{greyTick}</i>}
        <time class="fs10 clra0">{time}</time>
      </div>
    </div>
  </li>
    return orderNowData
  }
  createRatingHtml(msg,align,value,influs,time,name,img,after_rating=false,date){

    let ratingData,influ,ratingHtml = [], usr_name= name ? name : "IndiaMart User";
    let ratingGlidCheck = false;
    let thumbsDownHtml=[],thumbsUpHtml=[];
    let images = []
    let imgData = []
    usr_name = usr_name.split(" ")[0]
    if(usr_name.length>9){
      usr_name = usr_name.substring(0,6) + "...";
    }
    if(influs){
      influ=  JSON.parse(influs)
    }
    if(img && img.length>0){
      img.forEach((element,index)=> {
          imgData.push(element.value ? element.value : element); 
          index < 3 ? images.push(<div onClick={() => { this.importRatingImages() , gaTrack.trackEvent(['Messages', 'Rating_Images', 'Rating_Image_Clicked', 0, true]),this.setState({ratImageSelected:index,ratImgClicked:true,ratingImages:imgData,ratingAlign:align})}} className="fl tc mt10 por ml10 bxrd4 h80Msg w83pxMsg">
            {img.length > 3 && index == 2 ? <span className="fs24 cnterN z98msg poa clrw">+{img.length -2}</span> : ''}
            <img src={element.value ? element.value.replace(/http:/i, 'https:') : element&&element.replace(/http:/i, 'https:')} className={img.length > 3 && index == 2 ? "w100 ht100msg blurImgMsg bxrd5" : "w100 ht100msg bxrd5"} />
            </div>) : ''
      })
    }
    let thumbsDwn = '';
    let thumbsUp = '';
    thumbsDwn = influ && influ[0] ? influ[0].split(",") : '';
    thumbsUp = influ && influ[1] ? influ[1].split(",") : '';
    if(msg && msg.length > 86){
      msg = msg.substring(0,86) + "...";
    }
    for (let i = 1; i <= 5; i++) {
      ratingHtml.push(
        <i class={(i < 5) ? "mr5 pr dib" : "pr dib"}>{value >= i ? <svg xmlns="http://www.w3.org/2000/svg" width="15.124" height="14.426" viewBox="0 0 15.124 14.426">
        <g>
            <path fill="#f5c84e" d="M7.562 0l2.363 4.745 5.2.759-3.781 3.7.851 5.22-4.633-2.466-4.632 2.468.851-5.22L0 5.5l5.2-.759z" transform="translate(-190.161 -493.161) translate(190.161 493.161)"/>
        </g>
    </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="15.097" height="14.4" viewBox="0 0 15.097 14.4">
          <g>
              <g fill="none">
                  <path d="M7.549 0l2.359 4.737 5.19.758-3.775 3.695.849 5.211-4.623-2.464L2.925 14.4l.849-5.21L0 5.495l5.19-.758z" transform="translate(-190.159 -492.142) translate(190.159 492.142)"/>
                  <path fill="#727272" d="M7.549 2.243l-1.464 2.94-.233.468-.518.075-3.192.467 2.332 2.282.37.363-.083.513-.524 3.217 2.841-1.513.47-.25.47.25 2.842 1.513-.524-3.217-.084-.513.371-.363 2.332-2.282-3.192-.467-.517-.075-.234-.468-1.463-2.94m0-2.243l2.359 4.737 5.19.758-3.775 3.695.85 5.21-4.624-2.463L2.925 14.4l.85-5.21L0 5.495l5.19-.758L7.549 0z" transform="translate(-190.159 -492.142) translate(190.159 492.142)"/>
              </g>
          </g>
      </svg>}</i>
      )
    }
    if (thumbsUp && thumbsUp.length > 0) {
      for (let i = 0; i < thumbsUp.length; i++) {
        thumbsUpHtml.push(<>
          <span className="ml5 mr5">{thumbsUp[i].replace("1", "Response").replace("2", "Quality").replace("3", "Delivery")}</span>
          <svg className="por top3" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path fill="none" d="M18 18H0V0h18z" />
            <path fill="#4cb684" d="M2 15.5h1.5a.752.752 0 0 0 .75-.75V8a.752.752 0 0 0-.75-.75H2zm14.873-5.34a1.485 1.485 0 0 0 .127-.6v-.81a1.5 1.5 0 0 0-1.5-1.5h-4.125l.69-3.488a.752.752 0 0 0-.06-.495 3.6 3.6 0 0 0-.66-.915L11 2 6.193 6.808a1.5 1.5 0 0 0-.443 1.065v5.88A1.756 1.756 0 0 0 7.505 15.5h6.082a1.511 1.511 0 0 0 1.29-.727l2-4.613z" transform="translate(-.5 -.5)" />
          </svg>
        </>)
      }
    }
    if (thumbsDwn && thumbsDwn.length > 0) {
      for (let i = 0; i < thumbsDwn.length; i++) {
        thumbsDownHtml.push(<>
          <span className="ml5 mr5">{thumbsDwn[i].replace("1", "Response").replace("2", "Quality").replace("3", "Delivery")}</span>
          <svg  className="por tp6" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path fill="none" d="M0 0h18v18H0z" />
            <path fill="#d42a2a" d="M17 2h-1.5a.752.752 0 0 0-.75.75V9.5a.752.752 0 0 0 .75.75H17zM2.127 7.34a1.485 1.485 0 0 0-.127.6v.81a1.5 1.5 0 0 0 1.5 1.5h4.125l-.69 3.488a.752.752 0 0 0 .06.495 3.6 3.6 0 0 0 .66.915L8 15.5l4.807-4.808a1.5 1.5 0 0 0 .443-1.065v-5.88A1.756 1.756 0 0 0 11.495 2H5.412a1.511 1.511 0 0 0-1.29.727l-2 4.613z" transform="translate(-.5 1)" />
          </svg>
        </>
        )
      }

    }
    ratingData = <li id="ratingBox" style="width:290px" class={"crb mb10 por bgw mt20 tc ma feedbckBanner bxrd10 " + (align === 'left' ? 'fl' : 'fr')}><div class="rateDiv fs14"><span style="top:-2px" class="por dib mt10 clr000">{align == "right" ? <><span class="fw">You</span> have reviewed this user</> : <><span class="fw dib por mxw75 tp4 truncate">{usr_name}</span> has reviewed you</>}</span> {ratingHtml}</div>
      {msg && msg != "Rating submitted" ? <div class={align == "right" ? "fs14 ml10 tl mt10 wb" : "fs14 ml10 tl pdb5 mt10 wb"} dangerouslySetInnerHTML={{__html: msg.replaceAll("\n","<br>")}}></div> : ''}
      {images && images.length > 0 ? <div className={align == "right" || (influ && (influ[1] || influ[0])) ?  "dfMsg" : "dfMsg pdb10"}>        
        {images}
      </div> : ''}
      {influ && (influ[1] || influ[0]) ? <div className={align == "left" ? "fw fs14 ml5 mt5 pdb10 tl": "fw fs14 ml5 mt5 tl"}>{thumbsUpHtml.length > 0 ? <> {thumbsUpHtml} </> : ''}
        {thumbsDownHtml.length > 0 ? <>{thumbsDownHtml}</> : ''} </div> : ''}

      {align == "right" ? <span id={'edit-'+date} onClick={() => {this.editRating(),yandexTrackingMultiLevel('Messages','EDIT-RATING-THREAD',this.state.userType)}} className="fs12 ml10 mr10 tr editRvwBrd pdt10 fsi lspacing mr5 db mt10 pdb5 clrDrkB"><i class="pdr5"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 51 51"><path fill="#0E3192" fill-rule="nonzero" d="M47.697 3.301c-4.39-4.401-11.53-4.401-15.92 0L2.59 32.481a1.46 1.46 0 0 0-.413.837L.014 49.338c-.065.456.098.912.413 1.227.272.272.652.435 1.032.435.066 0 .13 0 .196-.01l9.65-1.305a1.47 1.47 0 0 0-.392-2.913l-7.737 1.044 1.51-11.172 11.758 11.759c.272.271.652.434 1.033.434.38 0 .76-.152 1.032-.434l29.188-29.18A11.19 11.19 0 0 0 51 11.255c0-3.01-1.174-5.836-3.303-7.955zM32.342 6.887l4.901 4.902-26.634 26.637-4.9-4.901L32.341 6.887zM17.488 45.294l-4.793-4.792L39.33 13.865l4.792 4.792-26.633 26.637zM46.164 16.56L34.44 4.833a8.3 8.3 0 0 1 5.303-1.901c2.228 0 4.314.869 5.89 2.434a8.242 8.242 0 0 1 2.434 5.89 8.28 8.28 0 0 1-1.902 5.304z"></path></svg></i>Edit Review</span> : ''}
      {time ? <span className="fs10 fr mt5 mb5 mr2" style="color: black; line-height: 16px;">{time}</span> : ''}
    </li>
      if(this.props.ratingType === 'B' && align == "right" && after_rating && ratingGlidCheck && (images.length === 0 || !msg)) {
        let text, btnText;
        if(images.length === 0 && !msg) {
          text = "Adding a comment or photo in review helps other buyers in their decision making.";
          btnText = "Add Photos and Comments"
        }
        else if(images.length === 0) {
          text = "Adding a photo in review helps other buyers in their decision making.";
          btnText = "Add Photos"
        }
        else {
          text = "Adding a comment in review helps other buyers in their decision making.";
          btnText = "Add Comments"
        }
        ratingData = <>{ratingData}
        <li id="newRatingBox" class="crb w290 mb10 por bgw mt20 tc ma feedbckBanner bxrd10 pd10">
          <img src='https://m.imimg.com/gifs/img/new-ack.png'></img>
          <span className="closeRating fs16" onclick={() => {document.getElementById('newRatingBox').style.display = 'none',document.getElementById('ratingBox').style.display='block'}}>&#10006;</span>
          <span class="por nmt5 fs12 dib">{`Thank you for the feedback. ${text}`}</span>
          <div className="df justContCent mt5">
            <button className='fs12 fw bxrd20 clrw tc ht27 w210p mt5 bgmim bxsh33' onclick={() => {this.impRatingForm()}}>{btnText}</button>
          </div>
        </li></>
        document.getElementById('ratingBox') ? document.getElementById('ratingBox').style.display = 'none' : '';
        document.getElementById('newRatingBox') ? document.getElementById('newRatingBox').style.display = 'block' : '';
      }
      if(align === 'right') {
      document.getElementById(this.editId) ? document.getElementById(this.editId).style.display = 'none': '';
      this.editId = 'edit-' + date;
       document.getElementById(this.editId) ? document.getElementById(this.editId).style.display = 'block': '';
      }
    return ratingData;
  }
  getExtension(filename) {
    let parts = filename.split('.');
    return parts[parts.length - 1];
  }
  showRatingForm(flag=false,val=false)
  {
    if(flag)
    {
      import(/* webpackChunkName:"ratingFormMail" */'../container/RatingFormContainer').then((module) => {
        self.setState({ ratingFormMail: module.default });
        this.setState({postCallRating:true})
     });
    }
    if(val)
    {
      this.setState({rateAfterCall:true})
    }
  }
  sendCallMsg(e, msgTxt,code) {
  if(code==31){
    gaTrack.trackEvent(['Messages', 'Reply-Template-Selected-PostCallPopUp', this.state.userType+this.enqLabelTrack, 0, true])
  }
  else if(code==80){
    gaTrack.trackEvent(['Messages', 'Reply_Sent_PostCallPopUp'+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true])
  }
  this.setState({ desc: msgTxt.trim(), showPostCall: false }, () => this.handleSubmit(e,false,30));
  }
  resetComp() {
    document.getElementById('callBlanket') ? document.getElementById('callBlanket').removeEventListener("click", self.resetComp) : '';
    self.state.showPostCall ? self.setState({ showPostCall: false }) : '';
  }
  findUserStatus(){
    let msg_data=this.props.message_Detail?this.props.message_Detail:[]
    let usrStatus="Buyer"
    msg_data.forEach(function(element){
      let msg_ref_type  = element.msg_ref_type
      if(msg_ref_type == "ENQ" ||  msg_ref_type == 'BL' ||(msg_ref_type == 'PNS' && element.msg_prod_name != '') || (msg_ref_type == 'C2C' && element.msg_prod_name != '') || (msg_ref_type == 'REPLY' && element.msg_prod_name != '')){
      usrStatus= element.msg_alignment=="right"?"Buyer":"Seller" 
    }})
    return usrStatus 
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.suggestiveReply && this.props.suggestiveReply.length == 0 && nextProps.suggestiveReply && nextProps.suggestiveReply.length > 0) {
    this.setReplyTemplates(nextProps.suggestiveReply, this.state.hrzntlTemp);
    }
  }
  setClickVariables = ()=> {
    this.setState({orderImageClicked: false, fromOrder: false})
  }
  setEnquiryID = (id, isCatalog='')=> {
    if(isCatalog == 'Catalog Link' && id){
      if(!this.uniqueId.has(id)){
        this.props.getMoreRelatedProducts(4, id);
        this.uniqueId.add(id);
      }
    }
  }

  impRatingForm() {
    import(/* webpackChunkName:"ratingFormMail" */'../container/RatingFormContainer').then((module) => {
      self.setState({ ratingFormMail: module.default });
      self.isEditRate=true;
   });
  }

  keyPadSubmit = (e) =>{
    let quantityInput = document.getElementById("entQty");
    let x = e.which || e.keyCode;
    if(x == 13 && !this.keypadEnter){
      this.setIsq(this.quantityValue, this.state.quantityUnit);
      quantityInput && quantityInput.value && quantityInput.value.trim() && !this.state.isError ? '' : quantityInput.value.trim() == '' ? this.setState({isError: true, errText: "Please Enter Quantity"})  : '', quantityInput.value.trim() && !this.state.isError ? (this.sendQuantityMessage(quantityInput.value, this.state.quantityUnit)) : '' ;
      gaTrack.trackEvent(['Messages', 'SetIsq|'+this.trackVal, this.checkUser() + this.isA2HS, 0, true])
      this.keypadEnter = true;
    }
  }
  quantityValidation = (e) => {
    let numbers = /^[0-9]+$/;
    let invalidNumber=/^[0]+$/;
    if(e.target && e.target.value.trim()==''){
      this.setState({isError: true, errText: "Please Enter Quantity"})
      this.keypadEnter = false;
    }
    else if(e.target && e.target.value && e.target.value.trim() && !e.target.value.trim().match(numbers)){
      this.setState({isError: true, errText: "Please Enter Valid Quantity Value"})
      this.keypadEnter = false;
    }
    else if(e.target.value.match(invalidNumber)){
      this.setState({isError: true, errText: "Please Enter Valid Quantity Value"})
      this.keypadEnter = false;
    }
    else{
      if(this.state.isError){
        this.setState({isError: false, errText: ""})
      }
    }
  }

  setIsq = (qty, unit) => {
    if (self.isOnetapNew) {
      let imEqGlLS = {};
      let lsData = JSON.parse(localStorage.getItem("msgSetIsqGl"));
      if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
          localStorage.removeItem("msgSetIsqGl");
          lsData = "";
      }
      let cookieDataArray = new Array();
      let cookieDataStr = "";
      if (lsData) {
          let cookieData = lsData['displayId'];
          cookieDataArray = cookieData.split("|");
          if (cookieDataArray[0] == "undef") {
              cookieDataArray.pop()
          } else {
              if (cookieDataArray.length >= 30) {
                  cookieDataArray.pop()
              }
          }
          cookieDataArray.unshift(self.displayID);
          cookieDataStr = cookieDataArray.toString()

          imEqGlLS['displayId'] = cookieDataStr;
          imEqGlLS['date'] = lsData['date'];
      } else {
          let nextday = new Date();
          nextday.setHours(nextday.getHours() + 24);
          cookieDataStr = self.displayID;
          imEqGlLS['displayId'] = cookieDataStr;
          imEqGlLS['date'] = nextday;
      }
      localStorage.setItem("msgSetIsqGl", JSON.stringify(imEqGlLS));
    }  
    let onetapMcatId = this && this.props && this.props.location && this.props.location.state && this.props.location.state.data && this.props.location.state.data.BRD_MCAT_ID?this.props.location.state.data.BRD_MCAT_ID:this.webViewDataObj && this.webViewDataObj.BRD_MCAT_ID?this.webViewDataObj.BRD_MCAT_ID:'';
    let gip = getCookieValByKey("iploc", "gip")
      ? getCookieValByKey("iploc", "gip")
      : "";
    let iplocCntry = getCookieValByKey("iploc", "gcnnm")
      ? getCookieValByKey("iploc", "gcnnm")
      : "";
    let data = {
      UPDATESCREEN: 'IMOB MESSAGES',
      modid: window.navigator && window.navigator.userAgent ? (window.navigator.userAgent.includes('IM-Android_Webview')?'ANDWEB':window.navigator.userAgent.includes('IM-IOS-WebView')?'IOSWEB':'IMOB') : 'IMOB',
      token: "imobile@15061981",
      q_id: this.state.selectedUnit2 && this.state.selectedUnit1 ? [this.state.selectedUnit2.qId, this.state.selectedUnit1.qId] : '',
      b_response: [qty, unit],
      q_desc: this.state.selectedUnit2 && this.state.selectedUnit1 ? [this.state.selectedUnit2.qDesc, this.state.selectedUnit1.qDesc] : '',
      enq: 1,
      format: "1",
      b_id: [this.state.selectedUnit2 ? this.state.selectedUnit2.bId : '', this.state.bId ? this.state.bId : ''],
      mcat_id: this.props.last_mcat_id ? this.props.last_mcat_id : onetapMcatId,
      setmcat: (this.props.last_mcat_id || onetapMcatId) ? false : true,
      UPDURL: window.location.href.length>=500?window.location.href.substring(0,498):'',
      UPDIP: gip,
      UPDIP_COUNTRY: iplocCntry,
      update: "1", //need to check
      isq_priority: [this.state.selectedUnit2 ? this.state.selectedUnit2.isqPriority : '', this.state.selectedUnit1 ? this.state.selectedUnit1.isqPriority : ''],
    };
      if (this.props.last_transaction_id || this.props.ofr_id || (this.webViewDataObj && this.webViewDataObj.Enquiry_Id)) {
        data.ofr_id = this.props.ofr_id?this.props.ofr_id:this.webViewDataObj && this.webViewDataObj.Enquiry_Id?this.webViewDataObj.Enquiry_Id:this.props.last_transaction_id?this.props.last_transaction_id:'';
        this.props.setISQ(data);
      }
  }

  changeOption(e){
    if(self.state.isError && self.state.errText && self.state.errText == "Please Enter Unit"){
      self.setState({isError: false, errText: ""})
    }
    if(self.state.isError && self.state.errText && self.state.errText == "Please Enter Quantity and Unit"){
      self.setState({isError: true, errText: "Please Enter Quantity"})
    }
    let c= document.getElementById("entUnit")
    let d = c && c.options[c.selectedIndex].id
    if(d){
      self.setState({bId: d,quantityUnit:e.target.value})
    }
    let val = c.options[c.selectedIndex].value
    if(val && val=='Other'){
      this.otherUnit = true;
      document.getElementById("editOpt") ? document.getElementById("editOpt").style.display="inline":'';
    }
    else{
      this.otherUnit = false;
      document.getElementById("editOpt") ? document.getElementById("editOpt").style.display="none":'';
    }
  }

  convertEscapedQuotes = input => {
    return input.replace(/\\"/g, '"');
  }

  reviewSellerCtaTracking = id => {
    if(!this.uniqueCall.has(id) && this.uniqueCall.size < 2){
      eventTracking("Messages", "Visible_Rating_Widget", "Conversation_RateNow_FromSeller", true);
      this.uniqueCall.add(id);
    }
  }
  render() {
    let isqMessages = [];
    let contactInfo = this.props.get_contdetails ? this.props.get_contdetails : this.contactDataFromNative ? this.contactDataFromNative : '';
    let errorText = this.state.isError && this.state.errText ? <div id="errQty" class="errRatMsg tc fs11 pdt10 pdl10">{this.state.errText}</div> : ''
    let ThankYouMsg = (window.location.href.indexOf("TYPageLanding=2") > -1 || (window.location.href.indexOf("OneTapReq")) > -1) ? 'mb50':'';
    let ThankYouMsg2 = (window.location.href.indexOf("TYPageLanding=2") > -1 || (window.location.href.indexOf("OneTapReq")) > -1) ? 'tMsg-50':'';
    let isBuyer = this.findUserStatus() == "Buyer" ? true : false;
    let stateCheck = self && self.props && self.props.location && self.props.location.state;
    let searchData = stateCheck && stateCheck.searchProps;
    let oneTapData = stateCheck && stateCheck.data;
    let productImage = searchData && searchData.productImage?searchData.productImage:oneTapData && oneTapData.PC_ITEM_IMG_SMALL?oneTapData.PC_ITEM_IMG_SMALL:this.webViewDataObj?this.webViewDataObj.PC_ITEM_IMG_SMALL:'';
    let productName = searchData && searchData.productName?searchData.productName:oneTapData && (oneTapData.PC_ITEM_DISPLAY_NAME || oneTapData.PC_ITEM_NAME)?(oneTapData.PC_ITEM_DISPLAY_NAME || oneTapData.PC_ITEM_NAME):this.webViewDataObj?this.webViewDataObj.PC_ITEM_DISPLAY_NAME:''; 
    let msgTextSearch = 'I am Interested in '+productName;
    let rcv_numSearch = stateCheck && stateCheck.contactNumber?stateCheck.contactNumber:oneTapData && (oneTapData.MOBILE_PNS || oneTapData.MOBILE)?(oneTapData.MOBILE_PNS || oneTapData.MOBILE) :this.webViewDataObj && (this.webViewDataObj.MOBILE_PNS || this.webViewDataObj.MOBILE) ? (this.webViewDataObj.MOBILE_PNS || this.webViewDataObj.MOBILE) : '';;
    let contact_number_typeSearch = searchData && searchData.contactType?searchData.contactType:oneTapData && oneTapData.MOBILE_PNS?'PNS':oneTapData && oneTapData.MOBILE?'MOBILE':this.webViewDataObj && this.webViewDataObj.MOBILE_PNS?'PNS':'';
    let seller_number_type = this.props && contactInfo && contactInfo.result && contactInfo.result.contact_number_type ? contactInfo.result.contact_number_type : this.props.location && this.props.location.state && this.props.location.state.contact_number_type ? this.props.location.state.contact_number_type :this.props.location && this.props.location.state && (this.props.location.state.contactType || this.props.location.state.CONTACT_TYPE)?(this.props.location.state.contactType || this.props.location.state.CONTACT_TYPE): (searchData && searchData.contactType?searchData.contactType:oneTapData && oneTapData.MOBILE_PNS?'PNS':oneTapData && oneTapData.MOBILE?'MOBILE':this.webViewDataObj && this.webViewDataObj.MOBILE_PNS?'PNS':'');
    let bubbleChat = <li className='lh18 crb por wr msgCn pad8 bgw leftBubbleChat fl b-dot'>
    <div class="dLoad tc"> <div class="b1 bgmim"></div><div class="b2 bgmim"></div><div class="b3 bgmim"></div></div>
    </li>
    let quantityFillMsg = (
      <>
        <div>
          {`Hi ${this.name}, To obtain the best price, what is your required order `}
          <strong>Quantity?</strong>
        </div>
      </>
    );

    let quantityInputField = (
      <input type="tel" ref={this.quantityInput} value={this.state.quantityValue} autoFocus={this.webViewDataObj && this.isOnetapNew && !this.props.singleClickUpdate?this.showKeyboard():this.isOnetapNew && true} onKeyDown={(e) =>{ this.keyPadSubmit(e)}} placeholder="Enter Quantity" maxLength={10} onChange = {(e)=> (this.quantityValidation(e), this.setState({quantityValue: e.target.value}))} onfocusout={(e)=> {e.target && !e.target.value && this.setState({isActive: false, isError: true, errText: 'Please Enter Quantity'})}} onFocus={()=> {this.setState({isActive: true}),this.realignTemp()}} id="entQty" className={"pd5 bxrd4 flx3 w60 fs16 "+(this.state.isActive ? "brd008b80" : "enqfocusout")}/>
    )
    let isqOptions = (
      this.state.messagesIsq && Object.keys(this.state.messagesIsq).length>1 ? this.state.messagesIsq[0] && this.state.messagesIsq[0].qDesc == "Quantity" && this.state.messagesIsq[1] && this.state.messagesIsq[1].qDesc == "Quantity Unit" && this.state.messagesIsq[1].qOptions.filter((item, index) => item.optionsDesc && !item.optionsDesc.includes("Other") && index < 3).map(function (item, index) {
        return <div id={item.optionsId} className={"bgw bxrd6 pd_tb35 "+(item.optionsId === self.state.selectedItem ? "otpBtnIn clrmim" : (index === 0 && !self.state.selectedItem) ? "otpBtnIn clrmim" : "brdrlg")} onClick={()=> self.setState({selectedItem: item.optionsId, bId: item.optionsId, quantityUnit: item.optionsDesc ? item.optionsDesc.charAt(0).toUpperCase() + (item.optionsDesc.length > 1 ? item.optionsDesc.slice(1) : '') : ''})}>{item.optionsDesc ? item.optionsDesc.charAt(0).toUpperCase() + (item.optionsDesc.length > 1 ? item.optionsDesc.slice(1) : '') : ''}</div>
      }) : <div className="bgw bxrd6 pd_tb35 otpBtnIn clrmim">Unit</div>
    )
    let isqFillForm = (
      <div className='pl12 maxw75'>
                      <h4 className='truncate'>{!this.isOnetapNew && this.props.last_transaction_prodName?this.props.last_transaction_prodName:productName?productName:''}</h4>
                      <div className='df mt10 gap10'>
                          {quantityInputField}
                      </div>
                      <div className="df mt10 fs12 gap10">
                      {isqOptions}
                    </div>
                    </div>
    )
    let submitButton = (
      <div 
          id="submitButton" onClick={(e) => {this.enquirySubmit(e)}} className="w100 bxrd30 por sbmtAnimMsg clrw clrw bgmim bxsh3 df justContCent flxCntr mt10 pd_tb510"
        >
        <span className='fs16 fw'>Submit</span>
          <span style={styles.imageCss().bgMsc} className="SbmtEnqMsg2 sndIcnPos2"></span>
        </div>
)
    let oneTapEnquiryCard = (
    <>
     <li className='crb fr mw92'>
      <div className='brdr5nr'>
        <div className='lh18 crb por wr msgCn padd8 eqright tc'>
            <div className="crx">
              <h4 className="tc fs15">{productName}</h4>
              {(productImage) &&
                <div className="df justContCent mt10" onClick={() => { this.setState({ popUpClicked: true }), gaTrack.trackEvent(['Messages', 'Enquiry_image_clicked', this.state.userType, 0, true, this.loginType + "-" + this.source]), this.imageZoomer(productImage ? productImage.replace(/http:/i, 'https:') : '','right',productName) }}><img src={productImage.replace(/http:/i, 'https:')} className="brdcf7 wh135" /></div>}
              <p><span className="db tc m10">{msgTextSearch}</span></p>
              {rcv_numSearch && rcv_numSearch != '+91' && <div><a className='bxrd20 w50 bgmim df justContCent mAuto flxCntr msgOdrPd5_0 mr7Auto' onClick={(e) => {gaTrack.trackEvent(['Messages', 'Call-Conversation-EnquiryCard'+this.enqActionTrack+this.trackVal+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]), this.clickToCall(rcv_numSearch, this.contact_glid, contact_number_typeSearch, 'IMOB', 'CALL-BACK-ENQUIRY-CARD' + `${ThankYouMsg ?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH' : ''}`+this.enqLabelTrack, e,'Message_Center_Enquiry_Card_WebView'+(this.customDescription?'-Messenger_Widget' : ''),'-EnquiryCard'), e.stopPropagation() }} href={(rcv_numSearch) ? 'tel:' + rcv_numSearch : ''}><span>{postOrderCall}</span><span className='clrw fw pr8'>Call Now</span></a><p className="tc m10 fs13">It's better to call for an urgent requirement</p></div>}
            </div>
          </div>
      </div>
    </li>
    </>)
    let contactSellerStrip = (
      <>
      <li className="lh18 crb por wr padd8 eqCenter mt90"><div class="enqText mb5 tc fs13">You contacted this seller</div></li>
      </>
    ) 
    let dummyMsgSearch = window && window.location && window.location.href && (window.location.href.indexOf("TYPageLanding=2") > -1 || (window.location.href.indexOf("OneTapReq") > -1)) && self.props && self.props.resCode == 204?
    <>
   {contactSellerStrip} 
   {oneTapEnquiryCard}
    </>:'';
    let dummyMsg = !((window.location.href.indexOf("TYPageLanding=2") > -1) || (window.location.href.indexOf("OneTapReq") > -1)) &&  !this.isOnetapNew? <li className="lh18 crb por wr msgCn padd8 eqCenter"><div class="enqText mb5 tc fs13">You have not exchanged any messages with {this.webViewDataObj && this.webViewDataObj.BUYER_NAME ? this.webViewDataObj.BUYER_NAME : 'New Buyer'}</div></li>:'';
    let enquiryBox = (
      <>
        <li id="isqFill" className='crb fr mt5 mb15 mr5 maxw87Msg'>
          <div id="isqBox" className='pd12 enqBoxBrd bgd8efe7'>
            <div className='df'>
              <img src={productImage ? productImage.replace(/http:/i, 'https:') : 'https://m.imimg.com/gifs/background_image.jpg'} className="bxrd4 newEnqImage" />
              {isqFillForm}
            </div>
            <div>
              {errorText}
              {submitButton}
            </div>
          </div>
        </li>
      </>
    )
    let custReply =(
      <>
      {this.cta_value ? <li id="reply_0" class={self.props.resCode == 204 && !this.props.isAPiHit?"maxw75 crb fr mb10 mt20":"maxw75 crb fr mb10"}><div class="1h20 enqBoxBrd bgd8efe7"><div><div class="lh18 crb por wr pad8 eqleft"><div>{this.cta_value}</div></div></div></div></li> : ''}  
      </>
    )
    let oneTapUI = (
      <>
        {!this.cta_value ? <li className={self.props.resCode == 204 && !this.props.isAPiHit?'df flxCntr mb8 ml5 mt16':'maxw75 crb fl por'}>
          <span className={self.props.resCode == 204 && !this.props.isAPiHit?'tbSp oneTapIMLogo mln85':'tbSp oneTapIMLogo mln85 por db rt10 msgtp17'}></span>
          <span className='ml10'>Indiamart</span>
        </li> : ''} 
        {custReply}
        <li id={"reply_0"} className='maxw75 crb fl mb10 mt10'>
          <div className="1h20 bgw enqBoxBrd">
            <div>
              <div className='lh18 crb por wr pad8 eqleft'>
                {quantityFillMsg}
              </div>
            </div>
          </div>
        </li>
        {enquiryBox}
      </>
    )

    let oneTapUI2 = (
      <>
        {
            <li id={"reply_0"} className={'mw92 crb mAuto'}>
              {<div id="isqBox" className="bce2 bgdbf4e6 mt5 minh100 msgBrdr"><div className="mt10 mb10 ml15">What is the required <strong>Quantity?</strong> </div><div className="ml15">
                <div>
                  <div className="mr15 mt10">
                    <div className="dfMsg">
                      <div className="fl w60">
                        <input type="tel" ref={this.quantityInput} value={this.quantityValue} autoFocus={true} onKeyDown={(e) => { this.keyPadSubmit(e) }} placeholder="Enter Quantity" maxLength={10} onChange={(e) => (this.quantityValidation(e), this.quantityValue = e.target.value)} onBlur={(e) => { e.target && !e.target.value && this.setState({ isActive: false, isError: true, errText: 'Please Enter Quantity',showReplyBox:true })}} onFocus={() => (this.setState({ isActive: true,isError:false, errText: '',showReplyBox:false }), this.handleViewFocus(), this.realignTemp())} id="entQty" className={"tc pd5 w100 ht32 brdrtl15 " + (this.state.isActive ? "brd008b80" : "enqfocusout")} />
                      </div>
                      <div className="fl w40">
                        <div className="por">
                          <select id="entUnit" tabIndex={-1} className={"w100 pd5 tc bgw fs14 clr008 ht32 brdrrb15 brdrln " + (this.state.isActive ? "brd008b80" : "enqfocusout")} onClick={() => gaTrack.trackEvent(['Messages', 'Unit_Selected|OneTapEnq', this.checkUser() + this.isA2HS, 0, true])} onChange={(e) => { this.changeOption(e) }}>
                            {this.state.messagesIsq ? this.state.messagesIsq[0] && this.state.messagesIsq[0].qDesc == "Quantity" && this.state.messagesIsq[1] && this.state.messagesIsq[1].qDesc == "Quantity Unit" && this.state.messagesIsq[1].qOptions && this.state.messagesIsq[1].qOptions.filter(item => !item.optionsDesc.includes("Other")).map(function (item) {
                              return <option id={item.optionsId} value={item.optionsDesc}>{item.optionsDesc && item.optionsDesc.length > 1 ? item.optionsDesc.charAt(0).toUpperCase() + item.optionsDesc.slice(1) : 'Unit'}</option>
                            }) : <option value={"Unit"}>Unit</option>}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                {this.state.isError && this.state.errText ? <div id="errQty" className="errRatMsg tc fs11 pdt10">{this.state.errText}</div> : ''}
                <button
                  id="submitButton" type='submit' onClick={(e) => { this.enquirySubmit(e) }} className="fs14 fw por bxrd20 sbmtAnimMsg clrw clrw bgmim bxsh3 w100px msgOdQ m12Auto db pr35"
                >
                  Submit
                  <span style={styles.imageCss().bgMsc} className="dib poa ml10 SbmtEnqMsg2 sndIcnPos"></span>
                </button>
              </div>}
            </li>
        }
      </>
    )

    if (this.props.userRating != 0 && this.state.rating_val == 0) {
      this.setState({ rating_val: this.props.userRating })
    }
    var autoIdentify = getQueryStringValue('autoidentify');
    var autoLoginconflict = getQueryStringValue('autoLoginconflict');
    var mailerUser = getQueryStringValue('username');
    var loginUser = getCookieValByKey('ImeshVisitor', 'mb1');

    if (document.getElementsByClassName("paidsellerdetail")[0]) {

      var chkht = document.getElementById('listing_banner_msg') ? ((window.innerHeight - ((document.getElementById('listing_banner_msg').offsetHeight) + 47) + 10)) : '';
      if (chkht) document.getElementsByClassName("paidsellerdetail")[0].style.minHeight = chkht + "px";

    }
    var arr = '';
    (!this.props.isFetchingmsgdetail || this.conversationDataFromNative) ? ((document.getElementById("loaderConversation")) ? (document.getElementById("loaderConversation").setAttribute('style', 'display:none')) : '') : ((document.getElementById("loaderConversation")) ? (document.getElementById("loaderConversation").setAttribute('style', 'display:block')) : '');
    (!this.props.isFetchingmsgdetail && this.isOnetapNew ) ? (document.getElementById("gblLoader").style.display="none") : ''
    if (!this.props.location.state && this.props.location.query.sup_glid == undefined) {
      location.href = '/messages/'
    } else {
      var name = ''; var contact_number_type = 'MOBILE'; var country_name = 'India';
      var stropheConnected = (typeof connection != 'undefined' && ACTIVE_GLID.includes(this.contact_glid)) ? 'dn' : '';
      var res = (this.props.message_Detail && this.props.message_Detail.length > 0) ? this.props.message_Detail : this.conversationDataFromNative;
      var localContactData = JSON.parse(localStorage.getItem('contact_details'));
      var localDataGlid = (localContactData && this.props.location.query.sup_glid) ? localContactData[atob(this.props.location.query.sup_glid)] : '';
      var tempCls = (!this.state.hrzntlTemp && (this.props.isFetchingmsgdetail && this.state.mlStatus === '')&&((typeof this.state.mlStatus == 'string' || this.state.mlStatus == true) && !this.props.receivedSuggReply)) ? "pd5 w50 fl" : "pd5 w50 fl";
      // var tempCls="pd5 w50 fl"
      // var tempWrapCls = (!this.state.hrzntlTemp &&this.state.randomTemp&&  this.state.randomTemp.length <= 5 && ((this.props.isFetchingmsgdetail && this.state.mlStatus === '') || ((typeof this.state.mlStatus == 'string' || this.state.mlStatus == true) && !this.props.receivedSuggReply) || (this.props.receivedSuggReply && this.props.suggestiveReply.length > 0))) ? "ntScrl crx pd5 ma" : "ntScrl crx pd5";
      var tempWrapCls = "ntScrl crx pd5" 
      name = localDataGlid && localDataGlid.contacts_name ? localDataGlid.contacts_name : this.webViewDataObj && this.webViewDataObj.BUYER_NAME ? this.webViewDataObj.BUYER_NAME : '';
      this.rcv_num = this.webViewDataObj && this.webViewDataObj.MOBILE_NO ? this.webViewDataObj.MOBILE_NO : '';
      this.c_city = this.webViewDataObj && this.webViewDataObj.LOCATION ? this.webViewDataObj.LOCATION : this.webViewDataObjNew?this.webViewDataObjNew.LOCATION:''
      this.c_name = localDataGlid ? localDataGlid.contacts_company : this.webViewDataObj && this.webViewDataObj.COMPANY_NAME ? this.webViewDataObj.COMPANY_NAME : '';
      contact_number_type = localDataGlid && localDataGlid.contact_number_type ? localDataGlid.contact_number_type : 'MOBILE';
      if((res && res.length == 0 && !this.props.isFetchingmsgdetail && !this.state.tempSugg) ||(this.isOnetapNew && !this.state.tempSugg)){
        let tempArr = [];
          tempArr[0] = { 'key': 'Time to Talk?', 'value': 'Please share time to talk','is_editable':0,'temp_flag':40 };
          tempArr[1] = { 'key': 'More Details?', 'value': 'Please share more details of requirement','is_editable':0,'temp_flag':40 };
          tempArr[2] = { 'key': 'Quantity & Order value?', 'value': 'What is the quantity and order value?','is_editable':0,'temp_flag':40 };
          tempArr[3] = { 'key': 'Product Available', 'value': 'Yes, Product is available','is_editable':0,'temp_flag':40 };
          this.setState({tempSugg: true, randomTemp: tempArr})
      }
      if (contactInfo && contactInfo.result && this.props.location.query.sup_glid != undefined) {
        name = contactInfo.result.contacts_name ? contactInfo.result.contacts_name : '';
        this.c_name = contactInfo.result.contacts_company;
        this.rcv_num = contactInfo.result.contacts_mobile1 ? "+"+contactInfo.result.contact_ph_country+"-"+contactInfo.result.contacts_mobile1 : '';
        contact_number_type = contactInfo.result.contact_number_type;
        this.c_city= contactInfo.result.contact_city;
        country_name = contactInfo.result.glusr_usr_countryname ? contactInfo.result.glusr_usr_countryname : country_name;
        var cd = contactInfo.result;
        if (cd != null && cd != undefined) {
          var newContact = {};
          newContact[cd.contacts_glid] = cd;
          var checkLocalSto = JSON.parse(localStorage.getItem("contact_details"));
          if (checkLocalSto == undefined || checkLocalSto == null) {
            localStorage.setItem('contact_details', JSON.stringify(newContact));
          }
          if (checkLocalSto !== undefined && checkLocalSto !== null) {
            let contactDetailsLS = JSON.parse(localStorage.getItem('contact_details'));
            var appendContacts = {...contactDetailsLS, ...newContact};
            localStorage.setItem('contact_details', JSON.stringify(appendContacts));

          }
        }
      }
      if (this.props.location.query.sup_glid == undefined) {
        var name = this.props.location.state.name ? this.props.location.state.name :this.props.location.state.companyName?this.props.location.state.companyName: 'Indiamart User';
        this.c_name = this.props.location.state.c_name ? this.props.location.state.c_name :this.props.location.state.companyName?this.props.location.state.companyName: '';
        this.c_city = this.props.location.state.c_city ? this.props.location.state.c_city :this.props.location.state.cityName?this.props.location.state.cityName:'';
        this.rcv_num = this.props.location.state.rcv_num ? this.props.location.state.rcv_num :(this.props.location.state.contactNumber || this.props.location.state.CONTACT_NUMBER)?(this.props.location.state.contactNumber || this.props.location.state.CONTACT_NUMBER):'';
        let country_code = contactInfo && contactInfo.result && contactInfo.result.contact_ph_country
        this.rcv_num = this.rcv_num ? '+' + (country_code ? country_code : '91') + updateNo(this.rcv_num.replace(/^0+/, '')):'';
        var contact_number_type = this.props.location.state.contact_number_type ? this.props.location.state.contact_number_type :(this.props.location.state.contactType || this.props.location.state.CONTACT_TYPE)?(this.props.location.state.contactType || this.props.location.state.CONTACT_TYPE): (searchData && searchData.contactType?searchData.contactType:oneTapData && oneTapData.MOBILE_PNS?'PNS':oneTapData && oneTapData.MOBILE?'MOBILE':this.webViewDataObj && this.webViewDataObj.MOBILE_PNS?'PNS':'');
        var country_name = this.props.location.state.country_name ? this.props.location.state.country_name : 'India';
      }
      if(self.props.resCode == 204 && window.location.href.indexOf("TYPageLanding=2") > -1){
        this.c_name = this.c_name == '' && self && self.props && self.props.location && self.props.location.state && self.props.location.state.c_name?self.props.location.state.c_name:'';
        this.rcv_num = this.rcv_num == '' && self && self.props && self.props.location && self.props.location.state && self.props.location.state.contactNumber?self.props.location.state.contactNumber:'';
      }
      if(this.isOnetapNew || (!contactInfo || (contactInfo && contactInfo.code == 204))){
        let enqData = self && self.props && self.props.location && self.props.location.state && self.props.location.state.data;
        if(!this.c_name) {
        this.c_name = (this.c_name == '' || this.c_name == 'Indiamart User') && enqData && enqData.COMPANYNAME?enqData.COMPANYNAME:(this.c_name == '' || this.c_name == 'Indiamart User') && this.webViewDataObj?this.webViewDataObj.COMPANYNAME:this.webViewDataObjNew?this.webViewDataObjNew.BUYER_NAME:'';}
        if(!this.rcv_num || this.rcv_num == '+91') {
          this.rcv_num = enqData && (enqData.MOBILE_PNS || enqData.MOBILE)?(enqData.MOBILE_PNS || enqData.MOBILE) :this.webViewDataObj && (this.webViewDataObj.MOBILE_PNS || this.webViewDataObj.MOBILE) ? (this.webViewDataObj.MOBILE_PNS || this.webViewDataObj.MOBILE) : this.webViewDataObjNew?this.webViewDataObjNew.MOBILE_NO:'';}
        }
      // Last Seen
      var lastSeen = "";
      if (this.props.lastSeenStatus) {
        if(this.setLastSeen())
        lastSeen = this.setLastSeen();
      }
      if (this.props.isFetchingmsgdetail || ((typeof this.state.mlStatus == 'string' || this.state.mlStatus == true) && !this.props.receivedSuggReply)) {
        if (this.state.loaderTemp.length == 0) {
          let tempArr = [0, 1, 2, 3, 4, 5];
          this.setState({ loaderTemp: tempArr });
        }
      }
      else if (this.state.mlStatus == true && this.props.receivedSuggReply && this.props.suggestiveReply.length > 0) {
        this.setReplyTemplates(this.props.suggestiveReply, this.state.hrzntlTemp);
      } else if (this.state.mlStatus == false && this.state.randomTemp.length == 0) {
        let tempArr = [];
        let keyName = (name != '' && name != 'Indiamart User') ? 'Hi ' + name : 'Hi';
        let tempKey = { 'key': keyName, 'value': keyName,'is_editable':0,'temp_flag':40 };
        if (this.props.location.state && this.props.location.state.is_txn_initiator && this.props.location.state.is_txn_initiator == 0) {
          tempArr[0] = { 'key': 'Ask order quantity', 'value': 'What is the order quantity?','is_editable':0,'temp_flag':40 };
          tempArr[1] = { 'key': 'Send more details', 'value': 'Please send more details about your requirement.','is_editable':0,'temp_flag':40 };
          tempArr[2] = { 'key': 'Request call-back', 'value': 'Please call me back whenever you are free.','is_editable':0,'temp_flag':40 };
          tempArr[3] = { 'key': 'Ask delivery location', 'value': 'Where do you want the order to be delivered?','is_editable':0,'temp_flag':40 };
        } else {
          tempArr[0] = { 'key': 'Share price details', 'value': 'What is the approximate price?','is_editable':0,'temp_flag':40 };
          tempArr[1] = { 'key': 'Need product details', 'value': 'I need more details about the product.','is_editable':0,'temp_flag':40 };
          tempArr[2] = { 'key': 'Send product photos', 'value': 'Kindly send more photos of this product.','is_editable':0,'temp_flag':40 };
          tempArr[3] = { 'key': 'Is product in stock?', 'value': 'Is this product currently in stock?','is_editable':0,'temp_flag':40 };
        }
        tempArr[4] = { 'key': 'Waiting for reply', 'value': 'I am waiting for your reply.','is_editable':0,'temp_flag':40 };
        tempArr = this.shuffle(tempArr, tempKey);
      } else if (this.state.randomTemp.length > 0 && this.state.randomTemp[0].key == "Hi" && name != '' && name != 'Indiamart User') {
        this.state.randomTemp[0].key = 'Hi ' + name;
        this.state.randomTemp[0].value = 'Hi ' + name;
      }
      if (typeof res != 'undefined') {
        if (res.length > 0) {
          var len = res.length;
          let enqTypeObj = {};
          let userStatus = this.state.userType;
          if (( !this.props.hasMoreItems && (this.state.newHit || this.state.prevPage == "contdet")) || (userStatus !== 'Seller-Paid' && !this.props.hasMoreItems && this.props.message_Detail && this.props.message_Detail.length == 1 && ((getQueryStringValue('TYPageLanding') == 1) || (getQueryStringValue('TYPageLanding') == 2 )))) {
            enqTypeObj = this.showHowContactAdded();
          }

          if(!this.willUiRender && this.androidWebview){
            updateDataLoadingStatus("1");
            this.willUiRender = true;
          }

          this.state.reply.details['replyToMobile'] = res[0]['msg_call_receiver_number'];
          this.state.reply.details['replyToGlid'] = res[0]['msg_receiver_id'];
          this.state.reply.details['queryid'] = res[0]['msg_query_id'];
          this.state.reply.details['q_type'] = res[0]['msg_query_type'];
          this.state.reply.details['subject'] = res[0]['msg_sub'];
          var replies = [];
          var callIndex = res.findIndex(x => ((x.msg_ref_type == 'PNS' || x.msg_ref_type == 'C2C')));
          for (var i = len-1; i >= 0; i--) {
          arr = '';
          var current_datetime = new Date();
          var current_time = self.timeformatAMPM(current_datetime);
          var current_date = self.dateformatslash(current_datetime);
          var new_date = (res[i]['msg_date'].split(" ")); 
          var reply_date = new_date[1]+","+new_date[2];

          if((res[i]['msg_alignment'] === "right" || res[i]['msg_ref_type'] == "C2C") && !this.uniqueCall.has(res[i]['message_id'])){
            this.buyerMsgCount++;
            this.uniqueCall.add(res[i]['message_id'])
           }
          if(res[i]['msg_modref_id'] && res[i]['msg_prod_name']){
              this.lastModrefId = res[i]['msg_modref_id'];
              this.lastProdName = this.convertEscapedQuotes(res[i]['msg_prod_name'])
          }
          if(res[i].local_date || this.countryName == 'India')
          {
          var contact_datetime = new Date(new_date[1].split("-")[1] + '/' + new_date[1].split("-")[0] + '/' + new_date[1].split("-")[2] + ' ' + new_date[2].split(":")[0] + ':' + new_date[2].split(":")[1] + ':' + new_date[2].split(":")[2]);
          }
          else{
            var format_date=new_date[1].split("-");  
            var month = ["Jan", "Feb", "Mar", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var str=month[format_date[1]-1]+' '+format_date[0]+' '+format_date[2]+' '+new_date[2]+" "+'GMT+0530';
            var date=new Date(str);
            var contact_datetime=date;
          }
            var contact_time = self.timeformatAMPM(contact_datetime);

            var contact_date = self.dateformatslash(contact_datetime);
 
            if ((current_date == contact_date) && (current_time == contact_time)) {
              this.state.reply.date_time[i] = 'Just Now';
            }
            else if (current_date == contact_date) {
              this.state.reply.date_time[i] = contact_time;
            }

            else if (((current_datetime.getTime() - contact_datetime.getTime()) / (1000 * 3600 * 24)) == 1) {
              this.state.reply.date_time[i] = 'Yesterday';
            }
            else {
              this.state.reply.date_time[i] = getMonthDate(contact_datetime);
            }

            //Different Design for First Enquiry
            let is_First_Msg_Enq = (res[i]['msg_ref_type'] == 'ENQ' && (typeof enqTypeObj != undefined && enqTypeObj.hasMessage && i == len - 1) || (this.props.message_Detail && this.props.message_Detail.length == 1 && ((getQueryStringValue('TYPageLanding') == 1) || (getQueryStringValue('TYPageLanding') == 2 )))) ? true : false;

            if (i == len - 1) {

              if (res[i]['msg_alignment'] == 'right') {
                this.state.reply.f[i] = "eqright";
                this.state.reply.names[i] = !is_First_Msg_Enq ? "You" : "";
                this.state.align = "right";

              } else {
                this.state.reply.f[i] = "eqleft";
                this.state.reply.names[i] = (name) ? name.split(" ")[0] : '';
                this.state.align = "left";
              }
            }
            else {
              if (res[i]['msg_alignment'] == 'right' && this.state.align == "left") {
                this.state.reply.f[i] = "eqright";
                this.state.reply.names[i] = "You";
                this.state.align = "right";

              } else if (res[i]['msg_alignment'] == 'right') {
                this.state.reply.f[i] = "eqright";
                this.state.reply.names[i] = "";

              }

              if (res[i]['msg_alignment'] == 'left' && this.state.align == "right") {
                this.state.reply.f[i] = "eqleft";
                this.state.reply.names[i] = name.split(" ")[0];
                this.state.align = "left";

              } else if (res[i]['msg_alignment'] == 'left') {
                this.state.reply.f[i] = "eqleft";
                this.state.reply.names[i] = "";

              }
            }
            if(i==0 && typeof sendAckReceipt != "undefined" && typeof ACTIVE_GLID !== "undefined" && ACTIVE_GLID.includes(self.contact_glid) && this.state.hitReadReceipt && document.getElementById("receiverglid")!=null){
              window.sendAckReceipt(self.contact_glid, res[i]['message_id']);
              this.setState({hitReadReceipt:false});
            }

            try {
              let msgText=JSON.parse(res[i]['msg_text_json']);
              res[i]['msg_text'] = decodeURIComponent(msgText['message_text']);
            } catch {

            }
            if (i == 0 && self.props.location.state && self.props.location.state.last_cont_date && this.state && this.state.prevPage !== 'contdet') {
              if (typeof self.props.location.state.last_cont_date == 'object') {
                ((contact_datetime.getTime() > this.props.location.state.last_cont_date.getTime()) && (((current_datetime.getTime() - contact_datetime.getTime()) < 2000))) ? this.state.currentReply = true : '';

              }
              else {
                var new_date = self && self.props && self.props.location && self.props.location.state ? self.props.location.state.last_cont_date:"";
                var contact_datetime2 = new Date(new_date[1].split("-").reverse().join("-") + " " + new_date[2]);
                ((contact_datetime.getTime() > contact_datetime2.getTime()) && (((current_datetime.getTime() - contact_datetime.getTime()) < 2000))) ? this.state.currentReply = true : '';
              }

              var locStoRep = JSON.parse(localStorage.getItem('reply_details'));
              if (this.state.currentReply && locStoRep) {


                var removeIndex = this.removeVal(locStoRep, this.contact_glid);
                for (var property in locStoRep) {
                  if (removeIndex && removeIndex !== undefined) {
                    locStoRep.splice(removeIndex, 1);

                  }
                }
              }
              if(this.state.ratingFormOpen == false)
              {
                localStorage.setItem('reply_details', JSON.stringify(locStoRep));
              }
              let contacts_type = (this.props.location.state && this.props.location.state.contacts_type != undefined) ? this.props.location.state.contacts_type : (contactInfo && contactInfo.contacts_type != undefined) ? contactInfo.contacts_type : '';
              let contact_last_product = (this.props.location.state.contact_last_product) ? this.props.location.state.contact_last_product : '';
              let msgText=JSON.parse(res[i]['msg_text_json']);
              var cd = { glid: this.contact_glid, msg: (msgText['message_text'].replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ').split('&quot;').join(' ')), time: self.timeformatAMPM(contact_datetime), comp_name: this.c_name, comp_city: this.c_city, user_name: name, user_flag: this.props.location.state.flag, user_num: this.props.location.state.rcv_num, contacts_type: contacts_type, contact_last_product: contact_last_product, is_txn_initiator: (this.props.location.state && this.props.location.state.is_txn_initiator) ? this.props.location.state.is_txn_initiator : '', contact_number_type: (this.props.location.state && this.props.location.state.contact_number_type) ? this.props.location.state.contact_number_type : 'MOBILE', country_name: country_name };
              if (this.state.currentReply && cd != null && cd != undefined) {

                var newContact;
                var checkLocalSto = JSON.parse(localStorage.getItem("reply_details"));
                if (checkLocalSto == undefined || checkLocalSto == null) {
                  newContact = [];

                }
                if (checkLocalSto !== undefined && checkLocalSto !== null) {
                  newContact = JSON.parse(localStorage.getItem('reply_details'));
                }
                newContact.push(cd);
                if(this.state.ratingFormOpen == false)
                {
                  newContact?newContact[0].msg == undefined ? newContact[0].msg = "Rating submitted":'':'';
                  localStorage.setItem('reply_details', JSON.stringify(newContact));
                }



              }
              this.state.currentReply = false;

            }

            var supplier_id = btoa(this.contact_glid);
            var callBckTxt = '';
            if (i == callIndex) {
              callBckTxt = <div class="fs12 fw bxrd20 clrw tc truncate padd8 mb5 bgmim w35 fr bxsh33">Call Back</div>;
            }
            var callAgnTxt = '';
            if (i == callIndex) {
              callAgnTxt = <div class="fs12 fw bxrd20 clrw tc truncate padd8 mb5 bgmim w35 fr bxsh33">Call Again</div>;
            }
            if(res[i]['msg_ref_type']=="FEEDBACK"){  //feedback
              let ratingData= this.createRatingHtml(res[i]['msg_text'],res[i].msg_alignment, res[i].rating_value, res[i].rating_influ_parameter,this.state.reply.date_time[i], name,res[i]['msg_attach'],res[i]['after_rating'],res[i]['msg_date']);
              replies.push({message: ratingData, message_id: res[i]['message_id']})
            }
            else if(res[i]['show_order_now']==1 && res[i]['msg_alignment']=='left' && (contactInfo&&contactInfo.result&&contactInfo.result.contact_country_iso)==getCookieValByKey("ImeshVisitor","iso"))
            {
              let orderNow=this.initiateOrder(res[i].msg_attach1_url,res[i].msg_alignment,res[i].msg_text,res[i].msg_read_status,this.state.reply.date_time[i],res[i].msg_mcat_id);
              replies.push({message: orderNow, message_id: res[i]['message_id']})

              let topProducts = this.relatedProducts(this.displayID,'',true);
              replies.push({message: topProducts, message_id: res[i]['message_id']})
            }
            else if(res[i]['msg_ref_type']=="ORDER"){
              let orderNowData=this.createOrderNowHtml(res[i].msg_text_json,res[i].msg_query_type,res[i].msg_alignment,res[i].message_product_img_variants,this.state.reply.date_time[i],res[i].msg_prod_name,res[i].msg_ref_id,res[i].msg_read_status,res[i].msg_modref_id);
              replies.push({message: orderNowData, message_id: res[i]['message_id']})
            }
            else if(res[i]['msg_ref_type']=="SYSTEM"){
              let systemMsg = this.createSystemMsg(res[i].msg_text_json,this.state.reply.date_time[i]);
              replies.push({message: systemMsg, message_id: res[i]['message_id']});
            }
            else if(res[i]['msg_ref_type'] == 'PV' && res[i]['msg_modref_id']){
                let prodImages = res[i]['message_product_img_variants'] ? JSON.parse(res[i]['message_product_img_variants']) : '';
                prodImages = prodImages["0"]?prodImages["0"]["500x500"]?prodImages["0"]["500x500"]:prodImages["0"]["250x250"]?prodImages["0"]["250x250"]:prodImages["0"]["125x125"]?prodImages["0"]["125x125"]:res[i]['msg_prod_image_url']?res[i]['msg_prod_image_url']:'':'';
                let messageText = JSON.parse(res[i]['msg_text_json'])['message_text'];
                let productName = res[i]['msg_prod_name'] ? res[i]['msg_prod_name'] : '';
                let productViewHtml = this.createProductViewHtml(productName, prodImages, messageText,res[i].msg_alignment, this.state.reply.date_time[i], this.state.reply.f[i], i, res[i]['msg_read_status'], this.rcv_num, contact_number_type,ThankYouMsg)
                replies.push({message: productViewHtml, message_id: res[i]['message_id']})
            }
            else if(res[i]['msg_ref_type'] == 'PNS' || res[i]['msg_ref_type'] == 'C2C'){ //pns and c2c
              if(res[i-1] && res[i]['msg_prod_name'] && res[i]['msg_prod_name'] == res[i-1]['msg_prod_name'] && res[i-1]['msg_prod_name'] && res[i]['msg_ref_type']=='C2C' && res[i-1]['msg_ref_type']=='PNS'){  
              }
             else{
                if (enqTypeObj && enqTypeObj.message && i == len - 1) {
                  replies.push(
                    {message: <li id={"reply" + (i + 1)} className='lh18 crb por wr msgCn padd8 eqCenter'>
                    <div className="enqText mb5 tc fs13">{enqTypeObj.message}</div>
                  </li>, message_id: res[i]['message_id']}
                  )
                }
                let txtAlign = res[i]['msg_alignment'] ? res[i]['msg_alignment'] : ''
                let enqImageprod = res[i]['msg_prod_name'] ? res[i]['msg_prod_name'] : '';
                let callStatus = res[i]['msg_call_status'] == 'S' ? 'Call Successful for ' : res[i]['msg_call_status'] == 'F' && res[i]['msg_text'].indexOf('Missed call')> -1 ? res[i]['msg_text']+' for ': "Call Attempted for ";
                let callDuration = res[i]['msg_call_duration'] ? 'Call Duration:' + res[i]['msg_call_duration'] + ' sec' : '';
                let altMsg = callStatus + enqImageprod + ' on ' + this.rcv_num + ' ';
                let prodImages = res[i]['message_product_img_variants'] ? JSON.parse(res[i]['message_product_img_variants']) : '';
                prodImages = prodImages["0"]?prodImages["0"]["500x500"]?prodImages["0"]["500x500"]:prodImages["0"]["250x250"]?prodImages["0"]["250x250"]:prodImages["0"]["125x125"]:res[i]['msg_prod_image_url']?res[i]['msg_prod_image_url']:'';
                replies.push(
                  {message: <li id={"reply" + i}>
                  {((enqImageprod || prodImages) || is_First_Msg_Enq) && <><div className='lh18 crb por wr msgCn pd5 eqCenter mw100 eqShadow'>
                    {is_First_Msg_Enq && <div class="enqText mb5 tc fs13">{enqTypeObj.message}</div>}
                    {((res[i]['msg_prod_name'] || prodImages) && is_First_Msg_Enq) ? <div class="lh1 bce2 mb5"></div> : ''}
                    {(res[i]['msg_prod_name'] || prodImages) ? <div class="flxCntr df">{prodImages ? <div className="fl w100px pdt4 flxShr0 tc"><img id={"msg_attach" + i + "_0"} width="90" height="90" style='max-height:90px;max-width:90px' onClick={() => { this.imageZoomer(prodImages ? prodImages.replace(/http:/i, 'https:') : '', txtAlign, enqImageprod) }} src={prodImages ? prodImages.replace(/http:/i, 'https:') : ''} alt='' /></div> : ''}<div style={prodImages ? "padding-left:10px" : ''}>
                      {res[i]['msg_prod_name'] ? <p><span className="db fw fs16">{res[i]['msg_prod_name']}</span> <span className="db mt5"></span></p> : ''}
                      {res[i]['msg_text'] ? <div className="enqCon fs14">{altMsg}
                        <div className='enqCon fs14 mt5'>{callDuration}</div>
                      </div> : ''}
                      {(this.rcv_num && this.rcv_num != '+91') &&
                        <a onClick={(e) => { this.props.location.state && this.props.location.state.unreadMessages ? gaTrack.trackEvent(['Messages', 'Call_back_notification_UnreadFilter'+this.enqActionTrack, this.state.userType+this.enqLabelTrack, 0, true, this.loginType + "-" + this.source]) : gaTrack.trackEvent(['Messages', 'Call_back_notification'+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType, 0, true, this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB', 'CALL-BACK-NOTIFICATION'+`${ThankYouMsg?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH':''}`+this.enqLabelTrack+(this.customDescription?'/Messenger_Widget' : ''),e) }} href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb">
                          <div className="fs12 fw bxrd20 clrw tc truncate padd8 lh13 bgmim w36 fr bxsh33">{(res[i]['msg_alignment'] == 'left') ?'Call Back':'Call Again'}</div>
                        </a>}
                    </div></div> : ''}
                   
                  </div>
                    <div className="fr fs11 crb">
                      {res[i]['msg_ref_type'] != 'PNS' && res[i]['msg_ref_type'] != 'C2C' ?
                        ((res[i]['msg_read_status'] == '-1' || res[i]['msg_read_status'] == '-2' || res[i]['msg_read_status'] == '-3')) ? <i className="fr pdl5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="15" height="15"><path fill="#2980B9" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i>
                          : <i className="fr pdl5"><svg viewBox="0 0 16 15" width="15" height="15"><path fill="#999999" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i> : ''}
                      <span class="msg-full-time dn">{reply_date}</span>
                      <time class="fs10 clra0"> {this.state.reply.date_time[i]} </time>
                    </div></>}
                  {!(enqImageprod || prodImages) && <div className="callClass">
                    <div className="1h20">
                      {(this.rcv_num && this.rcv_num != '+91') ?
                        <a onClick={(e) => { this.props.location.state && this.props.location.state.unreadMessages ? gaTrack.trackEvent(['Messages', 'Call_back_notification_UnreadFilter'+this.enqActionTrack, this.state.userType+this.enqLabelTrack, 0, true, this.loginType + "-" + this.source]) : gaTrack.trackEvent(['Messages', 'Call_back_notification'+this.enqActionTrack+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true, this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB', 'CALL-BACK-NOTIFICATION'+this.enqLabelTrack+(this.customDescription?'/Messenger_Widget' : ''),e,'Message_Center_Call_Attempted_WebView','-Call_Attempted'+(this.customDescription?'/Messenger_Widget' : '')) }} href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb" className="missedcall bxsh33 por db clr5a fs13">
                          <div className="pdb3">
                            <i classList={(res[i]['msg_alignment'] == 'right') ? "misscallIcon poa zIn call_out" : "misscallIcon poa zIn call_in"}></i><span>{(res[i]['msg_alignment'] == 'left') ? res[i]['msg_text']?res[i]['msg_text']:'Call attempted - incoming' : 'Call attempted - outgoing'}</span>
                          </div>
                          {(res[i]['msg_alignment'] == 'left') ? callBckTxt : callAgnTxt}
                        </a> : <div className="missedcall bxsh33 por clr5a fs13">
                          <div className="pdb3">
                            <i classList={(res[i]['msg_alignment'] == 'right') ? "misscallIcon poa zIn call_out" : "misscallIcon poa zIn call_in"}></i><span>{(res[i]['msg_alignment'] == 'left') ? res[i]['msg_text']?res[i]['msg_text']:'Call attempted - incoming' : 'Call attempted - outgoing'}</span>
                          </div>
                        </div>}
                      <div className="fr fs11 crb">
                        {res[i]['msg_ref_type'] != 'PNS' && res[i]['msg_ref_type'] != 'C2C' ?
                          ((res[i]['msg_read_status'] == '-1' || res[i]['msg_read_status'] == '-2' || res[i]['msg_read_status'] == '-3')) ? <i className="fr pdl5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="15" height="15"><path fill="#2980B9" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i>
                            : <i className="fr pdl5"><svg viewBox="0 0 16 15" width="15" height="15"><path fill="#999999" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i> : ''}
                        <span class="msg-full-time dn">{reply_date}</span>
                        <time class="fs10 clra0"> {this.state.reply.date_time[i]} </time>
                      </div>
                    </div>
                  </div>}</li>, message_id: res[i]['message_id']}
                  )
              }
            }
            else if (res[i].msg_attach && res[i].msg_attach.length > 0 && res[i].msg_attach[0]['key'] != "" ) { //attachement
              if (enqTypeObj && enqTypeObj.message && i==len-1)
              {
                replies.push(
                  {message: <li id={"reply" + (i+1)} className='lh18 crb por wr msgCn padd8 eqCenter'>
                  <div className="enqText mb5 tc fs13">{enqTypeObj.message}</div>
              </li>, message_id: res[i]['message_id']}
                )
              }
              let attachType = [];
              for (let x = 0; x < res[i].msg_attach.length; x++) {
                let msgText = JSON.parse(res[i]['msg_text_json'])['message_text'];
                let additionalDetail = JSON.parse(res[i]['msg_text_json'])['additional_details'];
                let additionalArray = [];
                additionalDetail && Object.entries(additionalDetail).forEach(([key, value]) => {   
                  if(key != "Remarks"){
                  additionalArray.push(<div className='mt10'><span className='less-show'>{key} : </span><span>{value}</span></div>)
                  } 
                })
                let fname = (res[i].msg_attach[x]['key'].includes('documents.imimg.com')) ? this.getExtension(res[i].msg_attach[x]['value']).toLowerCase() : this.getExtension(res[i].msg_attach[x]['key']).toLowerCase();
                let timeTick = '';
                let msgTxt = '';
                let callTxt = '';
                let txtAlign = res[i]['msg_alignment'] ? res[i]['msg_alignment'] : '';
                let checkImgCatalog = res[i]['msg_text'] ? res[i]['msg_text'].indexOf("indiamart.com/proddetail") > -1 : '';
                let prodImgName = checkImgCatalog ? res[i]['msg_text'].split("Price:") : ''
                prodImgName = prodImgName &&  prodImgName[0] && prodImgName[1] ?  prodImgName[0] : ''
                let checkPrice = checkImgCatalog && res[i]['msg_text'] ? res[i]['msg_text'].indexOf("Price:") > -1 : false
                let PriceVal  = checkImgCatalog && checkPrice ? res[i]['msg_text'].split("https://") : ''
                let prodPrice = PriceVal && PriceVal[0] && PriceVal[1] ? PriceVal[0].split("Price:") : ''
                prodPrice = prodPrice && prodPrice[0] && prodPrice[1] ? prodPrice[1].trim() : ''
                checkPrice = prodPrice && /\d/.test(prodPrice) ? true: false
                let attachmentBackground = res[i].msg_alignment === 'left' ? 'attachment-bg-left' : 'attachment-bg-right';
                let imgSrc = res[i].msg_attach[x]['value'].replace(/http:/i, 'https:');
                imgSrc = imgSrc.replace('https://s3.amazonaws.com/im-my-docs/', 'https://documents.imimg.com/')
                let isCatalog = checkImgCatalog ? "Product Catalog" : res[i]['msg_text'] && ( res[i]['msg_text'].toLowerCase().includes("please find my catalog link") || res[i]['msg_text'].toLowerCase().includes("please find the catalog link") || res[i]['msg_text'].toLowerCase().includes("here is my catalog link") || res[i]['msg_text'].toLowerCase().includes("follow this link to view our catalog")) ? "Catalog Link" : res[i]['msg_text'] && res[i]['msg_text'].includes("indiamart") ? "Indiamart Link" : '';
                if (fname == 'jpg' || fname == 'jpeg' || fname == 'gif' || fname == 'png') {
                  attachType.push(<div className={['quotAttach h100px w100', attachmentBackground].join(' ')} style={{backgroundImage: `url(${imgSrc})`}} onClick={()=> checkImgCatalog ? (this.imageZoomer(imgSrc,txtAlign,'',checkImgCatalog,checkPrice,prodImgName),gaTrack.trackEvent(['Messages', 'Product_image_clicked', this.state.userType, 0, true,this.loginType + "-" + this.source])) : this.imageViewer(imgSrc)}></div>);
                } else if (fname == "xls" || fname == "xlsx" || fname == "csv") {
                  attachType.push(<a target="_blank" href={res[i].msg_attach[x]['value']} style={styles.imageCss().attachImgType} className={["db",attachmentBackground, "attachImgTypeXls"].join(' ')} ></a>)
                } else if (fname == "txt") {
                  attachType.push(<a target="_blank" href={res[i].msg_attach[x]['value']} style={styles.imageCss().attachImgType} className={["db",attachmentBackground, "attachImgTypeTxt"].join(' ')} ></a>)
                } else if (fname == "doc" || fname == "docx") {
                  attachType.push(<a target="_blank" href={res[i].msg_attach[x]['value']} style={styles.imageCss().attachImgType} className={["db",attachmentBackground, "attachImgTypeDoc"].join(' ')} ></a>)
                } else if (fname == "ppt" || fname == "pptx") {
                  attachType.push(<a target="_blank" href={res[i].msg_attach[x]['value']} style={styles.imageCss().attachImgType} className={["db",attachmentBackground, "attachImgTypePpt"].join(' ')} ></a>)
                } else if (fname == "pdf") {
                  attachType.push(<a target="_blank" href={res[i].msg_attach[x]['value']} style={styles.imageCss().attachImgType} className={["db",attachmentBackground, "attachImgTypePdf"].join(' ')} ></a>)
                } else {
                  attachType.push(<a target="_blank" className="attach_link" href={res[i].msg_attach[x]['value']}>{res[i].msg_attach[x]['value'].substr(res[i].msg_attach[x]['value'].lastIndexOf('/') + 1)}</a>);
                }
                if (x == (res[i].msg_attach.length - 1)) {                  
                  timeTick = <div className="fr fs11 crb">
                    {res[i]['msg_alignment'] == 'right' && (res[i]['msg_ref_type'] != 'NOTE' && res[i]['msg_ref_type'] != 'REMINDER' && res[i]['msg_ref_type'] != 'PNS' && res[i]['msg_ref_type'] != 'C2C') ?
                      ((res[i]['msg_read_status'] == '-1' || res[i]['msg_read_status'] == '-2' || res[i]['msg_read_status'] == '-3')) ? <i className="fr pdl5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="15" height="15"><path fill="#2980B9" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i>
                        : <i className="fr pdl5"><svg viewBox="0 0 16 15" width="15" height="15"><path fill="#999999" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i> : ''}
                    <time class="fs10 clra0">{this.state.reply.date_time[i]} </time>
                  </div>  
                  
                  msgTxt = msgText?<div className='msgText tl' dangerouslySetInnerHTML={{
                    __html: (this.textLink(this.decode(msgText.replace('&amp;', '&').replace('%21', '!').replace(/&nbsp;/g, ' ').replace('&copy;', '©').replace('&lt;br&gt;', '<br>').replace('&lt;/br&gt;', '</br>')
                      .replace('&lt;br/&gt;', '</br>').replace('&lt;strong&gt;', '<strong>')
                      .replace('&lt;/strong&gt;', '</strong>').replace('&lt;strong/&gt;', '</strong>').split('&lt;').join('<').split('&gt;').join('>').split('&amp;').join('&').split('&quot;').join(' ')),isCatalog))
                  }}></div>:additionalDetail?<div className='msgText tl'>
                    {additionalArray}
                  </div>:"";
                  callTxt = (i==0 && !is_First_Msg_Enq && this.rcv_num && this.rcv_num != '+91'? <a onClick={(e) => { this.state.showCall ?  gaTrack.trackEvent(['Messages','IntelligentCall_Alert'+this.enqActionTrack, 'FollowUp_Call_Clicked'+this.enqLabelTrack, 0, true]) : this.props.location.state && this.props.location.state.unreadMessages ?  gaTrack.trackEvent(['Messages','Call-Conversation-FollowUp_UnreadFilter'+this.enqActionTrack, this.state.userType+this.enqLabelTrack, 0, true]) : gaTrack.trackEvent(['Messages','Call-Conversation-FollowUp'+this.enqActionTrack+this.trackVal, this.state.userType+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB', 'CALL-BACK-NOTIFICATION'+`${ThankYouMsg?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH':''}`+this.enqLabelTrack+(this.customDescription?'/Messenger_Widget' : ''),e,'Message_Center_Follow_Up_WebView','-Followup') }} href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb"><div className= {this.state.showCall && res[i]['msg_alignment'] == 'right' ? "fs12 fw bxrd20 clrw tc truncate callIcnAnim w100px mb5 bgmim mt3 fr bxsh33" : "fs12 fw bxrd20 clrw tc truncate w100px mb5 bgmim mt3 fr bxsh33"}><svg style="float:left" width="30px" height="30px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="b" transform="translate(-302.000000, -586.000000)"><g id="Group-3" transform="translate(303.000000, 587.000000)"><g id="Group-8" fill="#02A89A" stroke="#00A699" stroke-width="1.5"><circle id="Oval" cx="21.5" cy="21.5" r="21.5"></circle></g><path d="M30.7390421,26.798379 L27.9911748,23.5849113 C27.4438506,22.9474897 26.537471,22.9668562 25.9710796,23.6293825 L24.5866923,25.2478021 C24.4992287,25.1914359 24.4086981,25.1325593 24.3135157,25.0700963 C23.4392896,24.5036853 22.2427622,23.7273508 20.983666,22.2540009 C19.7208381,20.7775428 19.0562994,19.3762793 18.5704194,18.3533803 C18.5191477,18.2450115 18.470023,18.1405279 18.4215117,18.0413044 L19.3506389,16.9564803 L19.8074326,16.4216894 C20.374693,15.7582067 20.3903352,14.6986667 19.8442889,14.0593922 L17.0964216,10.8455659 C16.5503753,10.207188 15.6435868,10.2265545 15.0763264,10.8900371 L14.3018832,11.8008016 L14.3230462,11.8253684 C14.063365,12.2128184 13.8463676,12.6596829 13.6848847,13.1415745 C13.536028,13.6002742 13.4433504,14.0379934 13.4009733,14.4766093 C13.0381352,17.9939042 14.4127078,21.2084479 18.1431211,25.5705176 C23.2996854,31.5997221 27.4551989,31.1442502 27.6344709,31.1220146 C28.024913,31.0674417 28.3990993,30.9583555 28.7793688,30.7856707 C29.1879067,30.5990588 29.569812,30.3456801 29.9009567,30.0426897 L29.9178768,30.060263 L30.7024414,29.1619314 C31.2685261,28.4985683 31.2848328,27.4386697 30.7390421,26.798379 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path></g> </g></g></svg><span style="float:left; margin:6px 0; margin-left: -2px">Follow Up</span></div></a> : '')
                  let attachLength = attachType.length;
                  let messageID = res[i]['message_id']
                  replies.push(
                    {message: <li id={"reply" + i + '_' + x} className={ 'crb pdt5 w300p ' + (attachLength == 1 ? 'maxw65' : 'maxw75') + (res[i]['msg_alignment'] == 'left' ? ' fl' : ' fr')}>
                    <div className={'w100 crb bgd8efe7 msgBrdr padd8 ' + this.state.reply.f[i]}>
                      <div className='w100 df flxWrap mb5 justContCent'>
                      {attachType.map((item, index) => {
                        if(attachLength > 4 && index == 3 && !this.state.spreadAttach.includes(messageID)){
                          return (
                            <div className="w50 por" onClick={()=> this.setState(prevState => ({spreadAttach: [...prevState.spreadAttach, messageID], enableScrolling: false}))}>
                            {item}
                            <div className="lastAttach poa w100 ht100msg clrwh df justContAround flxCntr cnterN">+{attachLength - 3}</div>
                          </div>
                          )
                        }
                        else if(index > 3 && !this.state.spreadAttach.includes(messageID)){
                          return;
                        }
                        else {
                          return (
                          <div className="w50 oh">
                            {item}
                          </div>
                        )
                          }
                      })}
                      </div>
                      {msgTxt}
                      {callTxt}
                    </div>
                <span class="msg-full-time dn">{reply_date}</span>
                {timeTick}
              </li>, message_id: res[i]['message_id']}
                  );
                }
                
                if(res[i].msg_ref_type === 'ENQ' || res[i].msg_ref_type === 'BL'){
                  this.displayIDEnq = res[i].msg_modref_id;
                }
                this.setEnquiryID(this.displayIDEnq, isCatalog);
                this.displayIDEnq && isCatalog == 'Catalog Link' && res[i]['msg_alignment'] == 'left' && replies.push({message: this.relatedProducts(this.displayIDEnq, isCatalog, false), message_id: res[i]['message_id']})
              }
            } else if (res[i]['msg_alignment'] == 'left' || (res[i]['msg_alignment'] == 'right' && (res[i]['msg_ref_type'] != 'NOTE' && res[i]['msg_ref_type'] != 'REMINDER'|| res[i]['msg_ref_type'] == 'WHATSAPP' || res[i]['msg_ref_type'] == 'BIZ' || res[i]['msg_ref_type'] == 'BL'))) {  
              let stdId = ''
              stdId = res[i]['std_prod_id'] ? res[i]['std_prod_id'] : ''
              let isCatalog = res[i]['msg_text'] && (res[i]['msg_text'].toLowerCase().includes("please find my catalog link") || res[i]['msg_text'].toLowerCase().includes("please find the catalog link") || res[i]['msg_text'].toLowerCase().includes("here is my catalog link") || res[i]['msg_text'].toLowerCase().includes("follow this link to view our catalog"))  ? "Catalog Link" : res[i]['msg_text'] && res[i]['msg_text'].includes("indiamart") ? "Indiamart Link" : '';
              let txtAlign = res[i]['msg_alignment'] ? res[i]['msg_alignment'] : '';
              let enqImageprod = res[i]['msg_prod_name'] ? res[i]['msg_prod_name'] : '';
              let msgText = JSON.parse(res[i]['msg_text_json'])['message_text'];
              let otherMsgText = '';
              let otherMsgTextUI = '';
              if(isCatalog && (msgText.includes('Images') || (msgText.includes('Whatsapp')))){
              let imageIndex = -1;
              let whatsappIndex = -1;
                imageIndex = msgText.indexOf('Images');
                whatsappIndex = msgText.indexOf('whatsapp');
                if(imageIndex>0 && imageIndex<whatsappIndex){
                  otherMsgText = msgText.substring(imageIndex)
                  msgText = msgText.substring(0,imageIndex-1);
                }
                else{
                  otherMsgText = msgText.substring(whatsappIndex);
                  msgText = msgText.substring(0,whatsappIndex-1);
                }
              }
              if(otherMsgText){
                let mscArray = otherMsgText.includes('\n\n')?otherMsgText.split('\n\n'):otherMsgText.includes('\n')?otherMsgText.split('\n'):'';
                let otherTextUI = '';
                let linkUI = mscArray && mscArray.map((item,index)=>{
                  if(item.includes('http')){
                    let text = item.substring(0,item.indexOf('http')-1);
                    let link = item.substring(item.indexOf('http'));
                    return(
                      <React.Fragment key={index}>
                      <div><span>{text}</span><a href={link}>{link}</a></div>
                      <br></br>
                      </React.Fragment>
                    )
                  }
                })
                if(mscArray && mscArray[mscArray.length-1] && !mscArray[mscArray.length-1].includes('http')){
                 otherTextUI = <p>{mscArray[mscArray.length-1]}</p>
                }
                otherMsgTextUI = <>
                {linkUI}
                {otherTextUI}
                </>
              }
              let isqDetails = JSON.parse(res[i]['msg_text_json'])['isq'];
              let enrichDetails = JSON.parse(res[i]['msg_text_json'])['enrichment'];
              let additionalDetail = JSON.parse(res[i]['msg_text_json'])['additional_details'];
              let isqArray = [];
              isqDetails && Object.entries(isqDetails).forEach(([key, value]) => {   
                isqArray.push(<div><span className='less-show'>{key} : </span><span>{value}</span></div>)
               }) 
              enrichDetails && Object.entries(enrichDetails).forEach(([key, value]) => {   
                isqArray.push(<div className='mt10'><span>{value}</span></div>)
               })
              additionalDetail && Object.entries(additionalDetail).forEach(([key, value]) => {   
                isqArray.push(<div className='mt10'><span className='less-show'>{key} : </span><span>{value}</span></div>)
               }) 
               let isIsqRequired = (res[i]['msg_ref_type'] == "ENQ" || res[i]['msg_ref_type'] == "C2C") && isBuyer && this.props.last_transaction_type !== "Y" && !isqDetails && !this.uniqueCall.has(res[i]['msg_ref_id'])&&this.buyerMsgCount<2;
               if(isIsqRequired && !this.isOnetapNew && res[i]['msg_mcat_id'] && res[i]['msg_prod_name']){
                 this.props.getIsq({enqMcatId: res[i]['msg_mcat_id'], productName: res[i]['msg_prod_name']
                 });
                 this.uniqueCall.add(res[i]['msg_ref_id']);
               }
              let prodImage = res[i]['message_product_img_variants'] ? JSON.parse(res[i]['message_product_img_variants']) : '';
              prodImage = prodImage["0"]?prodImage["0"]["500x500"]?prodImage["0"]["500x500"]:prodImage["0"]["250x250"]?prodImage["0"]["250x250"]:prodImage["0"]["125x125"]:res[i]['msg_prod_image_url']?res[i]['msg_prod_image_url']:'';
              if (enqTypeObj && enqTypeObj.message && i==len-1)
              {
                replies.push(
                  {message: <li id={"reply" + (i+1)} className='lh18 crb por wr msgCn padd8 eqCenter'>
                  <div className="enqText mb5 tc fs13">{enqTypeObj.message}</div>
              </li>, message_id: res[i]['message_id']}
                )
              }
              let enqProdId;
              let enqProdName;
              if(res[i].msg_ref_type === 'ENQ' || res[i].msg_ref_type === 'BL'){
                enqProdName = is_First_Msg_Enq ? res[i].msg_prod_name : '';
                enqProdId = is_First_Msg_Enq && res[i].msg_modref_id;
              }

              let display_id =res[i]['msg_modref_id'];
              let isWhatsappEnq = res[i]['msg_ref_type'] == 'WHATSAPP';
              let isNotEnq = !(res[i]['msg_ref_type'] == 'ENQ' || isWhatsappEnq);
              replies.push(
                {message: <li id={"reply" + i} className={(res[i]['msg_ref_type'] == 'PNS' || res[i]['msg_ref_type'] == 'C2C') ? 'callClass pdt2' : ((res[i]['msg_alignment'] == 'left') ? 'crb fl '+(isNotEnq ? 'maxw65':'mw92') : 'crb fr '+(isNotEnq ? 'maxw65':'mw92'))} onClick={()=> {is_First_Msg_Enq ? (this.impOrderNow2(display_id), this.setState({showOrderNowDetail: true, popUpClicked: true, prodID: enqProdId, orderProdImg: prodImage ? prodImage.replace(/http:/i, 'https:') : '', orderProdName: enqProdName, fromFirstEnq: true}), enqProdId && this.fetchMsgProdDetail(enqProdId)) : !isNotEnq && this.imageZoomer(prodImage ? prodImage.replace(/http:/i, 'https:') : '',txtAlign,enqImageprod)}}>
                  
                    {(res[i]['msg_ref_type'] == 'PNS' || res[i]['msg_ref_type'] == 'C2C') ?
                      (this.rcv_num && this.rcv_num != '+91') ?
                        <a onClick={(e) => {this.props.location.state && this.props.location.state.unreadMessages ? gaTrack.trackEvent(['Messages', 'Call_back_notification_UnreadFilter'+this.enqActionTrack+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true]) : gaTrack.trackEvent(['Messages', 'Call_back_notification'+this.enqActionTrack+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB', 'CALL-BACK-NOTIFICATION'+`${ThankYouMsg?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH':''}`+this.enqLabelTrack+(this.customDescription?'/Messenger_Widget' : ''),e,'Message_Center_Call_Attempted_WebView','-call_Attempted') }} href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb" className="missedcall bxsh33 por db clr5a fs13">
                          <div className="pdb3">
                            <i classList={(res[i]['msg_alignment'] == 'right') ? "misscallIcon poa zIn call_out" : "misscallIcon poa zIn call_in"}></i><span>{(res[i]['msg_alignment'] == 'left') ? 'Call attempted - incoming' : 'Call attempted - outgoing'}</span>
                          </div>
                          {(res[i]['msg_alignment'] == 'left')?callBckTxt:callAgnTxt}
                        </a> : <div className="missedcall bxsh33 por clr5a fs13">
                          <div className="pdb3">
                            <i classList={(res[i]['msg_alignment'] == 'right') ? "misscallIcon poa zIn call_out" : "misscallIcon poa zIn call_in"}></i><span>{(res[i]['msg_alignment'] == 'left') ? 'Call attempted - incoming' : 'Call attempted - outgoing'}</span>
                          </div>
                        </div>
                      :
                      ( // reply type
                      <div className='brdr5nr'>
                      <div onClick={() => { is_First_Msg_Enq ? gaTrack.trackEvent(['Messages', 'First_enquiry_text_clicked', this.state.userType, 0, true,this.loginType + "-" + this.source]) : '' }} className={'lh18 crb por wr msgCn padd8 ' + (res[i]['msg_ref_type'] == 'ENQ' ? 'tc ' : '') + this.state.reply.f[i]}>
                            {(res[i]['msg_ref_type'] == 'ENQ' || isWhatsappEnq) && <div className="crx">
                              <h4 className="tc fs15">{res[i]['msg_prod_name']?res[i]['msg_prod_name']:productName?productName:""}</h4>
                              {(prodImage) &&
                              <div className="df justContCent mt10" onClick={()=> {this.setState({popUpClicked: true}),gaTrack.trackEvent(['Messages', 'Enquiry_image_clicked'+(this.webviewUiAbTest ? '_App' : ''), this.state.userType, 0, true,this.loginType + "-" + this.source])}}><img src={prodImage.replace(/http:/i, 'https:')} className="brdcf7 wh135"/></div>}
                              <p><span className="db tc m10">{msgText}</span></p>
                              {this.rcv_num && this.rcv_num != '+91' && <div><a className='callCta bxrd20 bgmim df justContCent mAuto flxCntr mr7Auto' onClick={(e)=>{gaTrack.trackEvent(['Messages', 'Call-Conversation-EnquiryCard-'+this.enqActionTrack+this.trackVal+(isWhatsappEnq ? '-whatsapp' : '')+(this.customDescription?'-Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]),this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB','CALL-BACK-ENQUIRY-CARD'+`${ThankYouMsg?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH':''}`+this.enqLabelTrack+(this.customDescription?'/Messenger_Widget' : ''),e,'Message_Center_Enquiry_Card_WebView'+(isWhatsappEnq ? '_Whatsapp' : ''),'-EnquiryCard'), e.stopPropagation()}} href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''}><span>{postOrderCall}</span><span className='clrw fs13 fw pr8'>{'Call Now ' + regionalCallNowText(this.state.userState)}</span></a><p className="tc m10 fs13">It's better to call for an urgent requirement</p></div>}
                              </div>
                            }  
                           
                           {(res[i]['msg_ref_type']=="REPLY" && !isWhatsappEnq &&res[i]['msg_text']&&res[i]['msg_text'].length>6&&res[i]['msg_text'].substring(0,3) == '```' && res[i]['msg_text'].indexOf('```', 3) != -1)? <div  className='msgText' dangerouslySetInnerHTML={{
                              __html:(this.quotedReply(this.decode(msgText.replace('&amp;', '&').replace('%21', '!').replace(/&nbsp;/g, ' ').replace('&copy;', '©').replace('&lt;br&gt;', '<br>').replace('&lt;/br&gt;', '</br>').replace('%28','(').replace('%29',')')
                                .replace('&lt;br/&gt;', '</br>').replace('&lt;strong&gt;', '<strong>')
                                .replace('&lt;/strong&gt;', '</strong>').replace('&lt;strong/&gt;', '</strong>').split('&lt;').join('<').split('&gt;').join('>').split('&amp;').join('&').split('&quot;').join(' ')),res[i]['msg_alignment']))}}></div>:
                            isNotEnq && <div  className='msgText' dangerouslySetInnerHTML= {{
                              __html: ( this.textLink(this.decode(msgText.replace('&amp;', '&').replace('%21', '!').replace(/&nbsp;/g, ' ').replace('&copy;', '©').replace('&lt;br&gt;', '<br>').replace('&lt;/br&gt;', '</br>').replace(/\n/g, "<br>").replace('.in<br>','.in <br>')
                                .replace('&lt;br/&gt;', '</br>').replace('&lt;strong&gt;', '<strong>').replace('%28','(').replace('%29',')')
                                .replace('&lt;/strong&gt;', '</strong>').replace('&lt;strong/&gt;', '</strong>').split('&lt;').join('<').split('&gt;').join('>').split('&amp;').join('&').split('&quot;').join(' ')),isCatalog))
                            }}></div>}
                            {otherMsgText && otherMsgTextUI?otherMsgTextUI:''}
                            {isqDetails || enrichDetails || additionalDetail?isqArray:''}
                          
                            {res[i]['std_prod_id'] ? <div className="mt10 tc" style="color: rgb(0, 166, 153);" onClick = {() => {this.getProductDetails(stdId)}}> View Full Product Description {">"} </div>:''}
                            
                            {res[i]['msg_alignment'] == 'left' &&  res[i]['is_ask_for_review_initiated']==1 ?
                            (res[i]['message_id'] ? this.reviewSellerCtaTracking(res[i]['message_id']) : '', <div onClick={()=>{this.editRating(),this.askForReview = true,yandexTrackingMultiLevel('Messages','Ask_For_Review_Rating_Clicked',this.state.userType), eventTracking(`Messages`,"Clicked_Rating_Widget","Conversation_RateNow_FromSeller",true);}} className="fs12 fw bxrd20 clrw tc truncate mb5 bgmim mt3 fr pdtb5 pl10 pr10 bxsh33">Review this Seller</div>)
                            :  i==0 && !is_First_Msg_Enq && isNotEnq && this.rcv_num && this.rcv_num != '+91'? <a onClick={(e) => { this.state.showCall ?  gaTrack.trackEvent(['Messages','IntelligentCall_Alert'+this.enqActionTrack, 'FollowUp_Call_Clicked'+this.enqLabelTrack, 0, true]) : this.props.location.state && this.props.location.state.unreadMessages ? gaTrack.trackEvent(['Messages', 'Call-Conversation-FollowUp_UnreadFilter', this.state.userType, 0, true]) : gaTrack.trackEvent(['Messages', 'Call-Conversation-FollowUp'+this.trackVal, this.state.userType, 0, true,this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB', 'CALL-BACK-NOTIFICATION'+`${ThankYouMsg?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH':''}`+this.enqLabelTrack+(this.customDescription?'/Messenger_Widget' : ''),e,'Message_Center_Follow_Up_WebView','-Followup') }} href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb"><div className={this.state.showCall && res[i]['msg_alignment'] == 'right' ? "fs12 fw callIcnAnim bxrd20 clrw tc truncate  w100px mb5 bgmim mt3 fr bxsh33" : "fs12 fw bxrd20 clrw tc truncate  w100px mb5 bgmim mt3 fr bxsh33"}><svg style="float:left" width="30px" height="30px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="b" transform="translate(-302.000000, -586.000000)"><g id="Group-3" transform="translate(303.000000, 587.000000)"><g id="Group-8" fill="#02A89A" stroke="#00A699" stroke-width="1.5"><circle id="Oval" cx="21.5" cy="21.5" r="21.5"></circle></g><path d="M30.7390421,26.798379 L27.9911748,23.5849113 C27.4438506,22.9474897 26.537471,22.9668562 25.9710796,23.6293825 L24.5866923,25.2478021 C24.4992287,25.1914359 24.4086981,25.1325593 24.3135157,25.0700963 C23.4392896,24.5036853 22.2427622,23.7273508 20.983666,22.2540009 C19.7208381,20.7775428 19.0562994,19.3762793 18.5704194,18.3533803 C18.5191477,18.2450115 18.470023,18.1405279 18.4215117,18.0413044 L19.3506389,16.9564803 L19.8074326,16.4216894 C20.374693,15.7582067 20.3903352,14.6986667 19.8442889,14.0593922 L17.0964216,10.8455659 C16.5503753,10.207188 15.6435868,10.2265545 15.0763264,10.8900371 L14.3018832,11.8008016 L14.3230462,11.8253684 C14.063365,12.2128184 13.8463676,12.6596829 13.6848847,13.1415745 C13.536028,13.6002742 13.4433504,14.0379934 13.4009733,14.4766093 C13.0381352,17.9939042 14.4127078,21.2084479 18.1431211,25.5705176 C23.2996854,31.5997221 27.4551989,31.1442502 27.6344709,31.1220146 C28.024913,31.0674417 28.3990993,30.9583555 28.7793688,30.7856707 C29.1879067,30.5990588 29.569812,30.3456801 29.9009567,30.0426897 L29.9178768,30.060263 L30.7024414,29.1619314 C31.2685261,28.4985683 31.2848328,27.4386697 30.7390421,26.798379 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path></g> </g></g></svg><span style="float:left; margin:6px 0; margin-left: -2px">Follow Up</span></div></a> : ''}
                          </div></div>
                           
                          )
                          }

                {<div className="fr fs11 crb">
                  {res[i]['msg_alignment'] == 'right' && (res[i]['msg_ref_type'] != 'NOTE' && res[i]['msg_ref_type'] != 'REMINDER' && res[i]['msg_ref_type'] != 'PNS' && res[i]['msg_ref_type'] != 'C2C') ?
                    ((res[i]['msg_read_status'] == '-1' || res[i]['msg_read_status'] == '-2' || res[i]['msg_read_status'] == '-3')) ? <i className="fr pdl5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="15" height="15"><path fill="#2980B9" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i>
                      : <i className="fr pdl5"><svg viewBox="0 0 16 15" width="15" height="15"><path fill="#999999" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></i> : ''}
                  <span class="msg-full-time dn">{reply_date}</span>
                  <time class="fs10 clra0"> {this.state.reply.date_time[i]} </time>
                </div>}
            </li>, message_id: res[i]['message_id']}
              )
              if(res[i].msg_ref_type === 'ENQ' || res[i].msg_ref_type === 'BL'){
                this.displayIDEnq = res[i].msg_modref_id;
              }
              this.setEnquiryID(this.displayIDEnq, isCatalog);
              this.displayIDEnq && isCatalog == 'Catalog Link' && res[i]['msg_alignment'] == 'left' && replies.push({message: this.relatedProducts(this.displayIDEnq, isCatalog, false), message_id: res[i]['message_id']})

              if(isBuyer && this.props.last_transaction_type !== "Y" && this.state.showIsqQuestion && !isqDetails && (res[i].msg_ref_type === 'ENQ' || res[i].msg_ref_type === 'C2C') && this.state.messagesIsq && this.buyerMsgCount<2 && !window.isFetchingIsqDetails && !this.isOnetapNew){
                !this.state.isqQuestionVisible && this.setState({isqQuestionVisible: true})
                if(!this.uniqueCall.has(res[i]['msg_modref_id'])){
                  gaTrack.trackEvent(['Messages', 'ISQ_Question_Visible', this.checkUser(), 0, true]);
                  this.uniqueCall.add(res[i]['msg_modref_id'])
                }
                isqMessages.push(
                  this.state.showBubbleChat ? bubbleChat : <>
                  <li id="question" className='maxw75 crb fl mb10 mt10'>
                    <div className="1h20 bgw enqBoxBrd">
                      <div>
                        <div className='lh18 crb por wr pad8 eqleft'>                            
                          {quantityFillMsg}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li id="isqFill" className='crb fr mt5 mb15 mr5 maxw87Msg'>
                    <div id="isqBox" className='pd12 enqBoxBrd bgd8efe7'>
                                <div className='df'>
                                  <img src={prodImage ? prodImage.replace(/http:/i, 'https:') : 'https://m.imimg.com/gifs/background_image.jpg'} className="bxrd4 newEnqImage"/>
                                  {isqFillForm}  
                                </div>
                                <div>
                                {errorText}
                                {submitButton}
                                </div>
                              </div>
                  </li>
                  </>
                )
              }
            }
          }

        }
        else {
          this.androidWebview && updateDataLoadingStatus("0")
        }
      }

      var showRatingFlag = (!this.state.isqQuestionVisible && (this.state.userType == 'Buyer' || this.state.userType == 'Seller-Free') && this.props.isRatingDisplay && this.props.userRating == 0 && this.props.ratingFetched && this.state.showRating) ? true : false;

      if (showRatingFlag && this.state.rateTrack) {
        yandexTrackingMultiLevel('Messages', 'Feedback_Visible', this.checkUser());
        this.setState({ rateTrack: false })
      }
      if (this.state.hrzntlTemp) {
        tempCls = "pd5 dib";
        tempWrapCls = "slr-chatSgtn ntScrl bgw";
    }
    }

    var filesInc = {};
    //provide files which are not required on this page
    filesInc.EnqHtml = 0;
    filesInc.centralizeEnqBl = 0;
    filesInc.common = 0;
    filesInc.miniBl = 0;
    filesInc.EnqBlCommon = 0;
    filesInc.chatbl = 0;
    filesInc.PopUpHtml = 0;

    var pageTitle = 'IndiaMart Messages';
    if (this.props.isReqCancld && !this.conversationDataFromNative) {
      return (
        <div>
           <input type="hidden" id="enqSenderId" />
          {(self.state.reqCanclled) ? <self.state.reqCanclled pathname='/messages/' c_name={this.c_name} c_city={this.c_city} name={name} userType={this.state.userType} contact_glid={(this.props.location.state&&this.props.location.state.contactglid) ? this.props.location.state.contactglid : ''} pageType={"conversation"} glid={this.glid} errortxt={this.props.errortxt}/> : ''}
        </div>
      )
    } else if (this.state.isFraudUser) {
      return (
        (self.state.verifyBlocker) ? <self.state.verifyBlocker pageName={pageTitle} isFraud={this.state.isFraudUser} /> : ''
      )
    } else {
      return (
        
        <div id="convList" className='notranslate'> 
          <CountryContainer />
          <span class="dn" id="receiverglid">{this.contact_glid}</span>
          <input type="hidden" id="enqSenderId" />
          {(autoLoginconflict == 'true' && mailerUser != loginUser) ? deleteCookie("im_iss"): ''}
          {this.state.ratImgClicked && this.state.ratingImgPopup ? <this.state.ratingImgPopup name={name} align = {this.state.ratingAlign} closeRatingPopUp={this.closeRatingPopUp} imagesData = {this.state.ratingImages} imgSelected={this.state.ratImageSelected} /> : ''}
          {this.state.imgClicked ? <ImageZoomer userType={this.state.userType} enqImg={this.enqImg} textAlignment={this.textAlignment} prodImgName={this.prodImgName} checkImgCatalog = {this.isImgCatalog} checkPriceAvail={this.isPriceAvail} name={name} imageUrl={this.imageUrl} handleCallMsg={this.handleCallMsg} closeImgZoomer={this.closeImgZoomer} callNumber={this.rcv_num ? this.rcv_num: ''} clickToCall={this.clickToCall} prodName = {this.props.last_transaction_prodName} contactglid={this.contact_glid} numberType={seller_number_type}></ImageZoomer> : '' }
          {this.state.showPrdDetail && this.state.stdLoaded ? <this.state.stdLoaded data={this.state.PrdData} userType={this.state.userType} closeStdProduct={this.closeStdProduct} callNumber={this.rcv_num ? this.rcv_num: ''} clickToCall={this.clickToCall} contactglid={this.contact_glid} numberType={seller_number_type} /> : '' }
          { (autoIdentify == true && (this.userMode == 0 || this.userMode == null) && self.state.loginModule) ? <self.state.loginModule userModeN={this.userMode} screenName="IMOB MESSAGES" showLogin={"FullLoginMode"}  scrolls={self}  />  :
            this.props.location.query.sup_glid !== undefined && this.userMode != 2 && self.state.loginModule ? <self.state.loginModule userModeN={this.userMode} screenName="IMOB MESSAGES" showLogin={"FullLoginMode"} scrolls={self} /> : (document.cookie.indexOf('im_iss') == -1)? self.state.loginModule ? <self.state.loginModule screenName="IMOB MESSAGES" userModeN={this.userMode} showLogin={"FullLoginMode"} scrolls={self} /> : '': <div className="msgBckgrnd bgw">
              <React.Fragment>
                {self.state.EnqBlComponent ? <self.state.EnqBlComponent filesInc={filesInc} /> : ''}
                {(this.props.resCode == 200) ? (self.state.verifyBlocker) ? <self.state.verifyBlocker pageName={pageTitle} hideSkip ={true} contact_glid={this.contact_glid} /> : '' : ''}
                {self.state.postOrderDetail && this.props.recievedOrderDetail && this.state.showPostOrderPopUp&&this.props.orderDetail && handlePostOrder(this.state.orderProdImg, this.state.orderProdName, this.props.orderDetail, this.showPostOrderPopUpMethod, this.clickToCall, this.reSetOrderDetail, this.props.productDetail, this.state.MsgAlign, this.state.orgSts, contactInfo) && this.handlePostOrderWebView(this.props.orderDetail) && !this.webviewContent ?<self.state.postOrderDetail prodImage={this.state.orderProdImg} prodName={this.state.orderProdName} orderDetail={this.props.orderDetail} showPostOrderPopUpMethod={this.showPostOrderPopUpMethod} clickToCall={this.clickToCall} reSetOrderDetail={this.reSetOrderDetail}  productDetail={this.props.productDetail} Align={this.state.MsgAlign} statusFlag={this.state.orgSts} supDetail={contactInfo}/> :''}
                
                {self.state.OrderNow_1&&this.state.showOrderNowPop&&self.props.orderId?<self.state.OrderNow_1 productId={this.state.prodID} productImage={this.state.orderProdImg} productName={this.state.orderProdName} productPrice={this.state.productPrice} company={(this.c_name && this.c_name != '') ? this.c_name : (name && name!='') ? name :'Indiamart User'} productDetail={this.props.productDetail} showOrderNowPopMethod={this.showOrderNowPopMethod} unit={this.state.unit} userInfo={self.props.orderContactInfo} orderId={self.props.orderId} supDetail={contactInfo} clickToCall={this.clickToCall}/>:''}
                
                {self.state.OrderNow_2&&this.state.showOrderNowDetail?<self.state.OrderNow_2 productImage={this.state.orderProdImg} productName={this.state.orderProdName} productPrice={this.state.productPrice} company={(this.c_name && this.c_name != '') ? this.c_name : (name && name!='') ? name :'Indiamart User'} productDetail={this.props.productDetail} showOrderNowDetailMethod={this.showOrderNowDetailMethod} unit={this.state.unit} userInfo={self.props.orderContactInfo} supDetail={contactInfo} generateOrder={this.generateOrder} clickToCall={this.clickToCall} showOrderNowDetail={this.state.showOrderNowDetail} productId={this.state.prodID} viewDetails={this.state.viewDetailsMiniPDP} orderImageClicked={this.state.orderImageClicked} setClickVariables={this.setClickVariables} fromOrder={this.state.fromOrder} handleCallMsg={this.handleCallMsg} rcv_num={this.rcv_num ? this.rcv_num: ''} contactglid={this.contact_glid} numberType={seller_number_type} smsLanding={this.state.smsLanding} showCallCta={this.rcv_num &&  (this.props.userPrivacy || this.countryName!='India')} fromFirstEnq={this.state.fromFirstEnq} fromSeller={this.state.fromFirstEnq && !isBuyer}/>:''}

                {this.abMiniCat && self.state.miniCatalog&&this.state.showMiniCatalog?<self.state.miniCatalog company={(this.c_name && this.c_name != '') ? this.c_name : (name && name!='') ? name :'Indiamart User'} showMiniCatalogMethod={this.showMiniCatalogMethod} unit={this.state.unit} userInfo={self.props.orderContactInfo} supDetail={contactInfo} generateOrder={this.generateOrder} showMiniCatalog={this.state.showMiniCatalog} clickToCall={this.clickToCall} rcv_num={this.rcv_num ? this.rcv_num: ''} contactglid={this.contact_glid} numberType={seller_number_type} productId={this.state.prodID} viewDetails={this.state.viewDetailsMiniPDP} orderImageClicked={this.state.orderImageClicked} setClickVariables={this.setClickVariables} fromOrder={this.state.fromOrder} fromEnquiry={this.state.fromEnquiry} handleCallMsg={this.handleCallMsg} smsLanding={this.state.smsLanding} showCallCta={this.rcv_num &&  (this.props.userPrivacy || this.countryName!='India')} productInfo={this.props.productDetail} topProductDetails = {this.detailsRelated} pharmaMCATs={this.pharmaMCATs}/>:''}

                {this.state.showConfirmPopup && <ConfirmPopup title={`Block ${this.c_name}?`} desc={'Blocked contacts cannot call or send you messages.'} submitText={'Block'} cancelText={'Cancel'} onSubmit={this.blockUser} onClose={() => {this.setState({showConfirmPopup: false})}}/>}

                {(this.state.showPostCall && this.state.postCallWrapper && this.state.userType != 'Seller-Paid') && !this.props.c2cMsg ? <this.state.postCallWrapper sendCallMsg={this.sendCallMsg} name={name?name:this.c_name} style={styles.imageCss().bgMsc} resetComp={this.resetComp} pageName="Conversation" showRatingForm={this.showRatingForm}showNewCallPopup={this.state.showNewCallPopup} /> : ''}
                {(self.state.postCallRating&&self.state.ratingFormMail) ? <self.state.ratingFormMail rating_val={getQueryStringValue("starRating") ? getQueryStringValue("starRating")  : this.state.rating_val} mcatId = {this.props.last_mcat_id ? this.props.last_mcat_id : '' } mcatName= {this.props.last_mcat_name ? this.props.last_mcat_name : ''} prodName= {this.props.last_transaction_prodName ? this.props.last_transaction_prodName : ''} ratingType={this.props.ratingType} seller_id={this.contact_glid} buyer_id={this.glid} modrefId={this.props.last_transaction_refid ? this.props.last_transaction_refid : this.props.last_transaction_id ? this.props.last_transaction_id : ''} hideFeedback={this.hideFeedback} isMail={self.isEditRate} pageName={'Messages'} company={(this.c_name && this.c_name != '') ? this.c_name : (name && name!='') ? name :'Indiamart User'}postCallRatingForm={this.state.postCallRating} askForReview={this.askForReview} ratefromlist={this.state.ratTypList} rateAfterCall={this.state.rateAfterCall} showInfu ={this.isRatEmail} listCallRate={this.state.listCallRate} newCallback={this.state.newCallback}webviewContent={this.webviewContent} webRatType={this.webRatType} webRatVal={this.webRatVal}/>: ''}
                <div className={this.webviewContent?'w100 bgw hdrShadow z99Msg pf': navigator.userAgent.indexOf("Firefox") > -1  ? 'hdrShadow ht90 bgw w100 z99Msg pf' : 't0 w100 bgw hdrShadow pf z99Msg'}>
                {(!history.state && document.referrer.indexOf('buyer/managebl/') < 0 && !this.isOnetapNew && !this.isNewConv) ?
                  <Link to={{ pathname: '/messages/', state: { glusrid: this.glid, contactglid: this.contact_glid, fromDetail: true } }}><i className="convBack pf zIn" onClick={() => {
                    window.removeEventListener("scroll", self.handleScrollDetail); document.removeEventListener("onMessageEvent", self.onMessageRecieved); document.removeEventListener("XmppJsloaded", self.connectChatUser);  gaTrack.trackEvent(['Messages', 'Back_Btn_Conversation', this.state.userType, 0, true,this.loginType + "-" + this.source]);
                    this.setState({smsLanding: false})
                  }}><svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16"><path fill="#333" fill-rule="nonzero" d="M7.503.24a.818.818 0 0 1 1.159 0 .803.803 0 0 1 0 1.136L2.785 7.19h19.392c.452 0 .823.356.823.803a.822.822 0 0 1-.823.814H2.785l5.877 5.805a.817.817 0 0 1 0 1.146.818.818 0 0 1-1.16 0L.236 8.568a.803.803 0 0 1 0-1.136L7.503.241z"></path></svg></i></Link> :
                  
                    <i className="convBack pf zIn" onClick={() => { self.props.location.query !== undefined && self.props.location.query.ref && self.props.location.query.ref != "CompanyPage" && self.props.location.query.sup_glid !== undefined && !ThankYouMsg &&  document.referrer.indexOf('buyer/managebl/') < 0 ? self.webviewContent && self.isOnetapNew ? this.handleFinishEnquiry(true):history.back():history.back();document.removeEventListener("onMessageEvent", self.onMessageRecieved); document.removeEventListener("XmppJsloaded", self.connectChatUser); window.removeEventListener("scroll", self.handleScrollDetail); gaTrack.trackEvent(['Messages',`${ThankYouMsg?this.companyTrack?'BackClicked_Message-Company':'BackClicked_Message-Search':'Back_Btn_Conversation'}`+this.trackVal, this.state.userType, 0, true,this.loginType + "-" + this.source]) }}><svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16"><path fill="#333" fill-rule="nonzero" d="M7.503.24a.818.818 0 0 1 1.159 0 .803.803 0 0 1 0 1.136L2.785 7.19h19.392c.452 0 .823.356.823.803a.822.822 0 0 1-.823.814H2.785l5.877 5.805a.817.817 0 0 1 0 1.146.818.818 0 0 1-1.16 0L.236 8.568a.803.803 0 0 1 0-1.136L7.503.241z"></path></svg></i>}

                {this.rcv_num && this.rcv_num != '+91' && <a  style="right:35px" class="msgCall pf zIn bgmim brdr50" href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb">
                  <span onClick={(e) => {!this.props.singleClickUpdate && this.isOnetapNew && this.generateEnquiry('3',true);this.props.location.state && this.props.location.state.unreadMessages ? gaTrack.trackEvent(['Messages', 'Call_Conversation_Top_UnreadFilter'+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType, 0, true]) : gaTrack.trackEvent(["Messages", 'Call_Conversation_Top'+this.enqActionTrack+this.trackVal+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB', 'MSG-CONVERSATION-PAGE'+`${ThankYouMsg?this.companyTrack?'-MESSAGE-COMPANY':'-MESSAGE-SEARCH':''}`+this.enqLabelTrack,e,'Message_Center_Toolbar_WebView','-Header'+(this.customDescription?'-Messenger_Widget' : ''));
                this.setState({smsLanding: false})}} ><svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="b" transform="translate(-302.000000, -586.000000)"><g id="Group-3" transform="translate(303.000000, 587.000000)"><g id="Group-8" fill="#02A89A" stroke="#00A699" stroke-width="1.5"><circle id="Oval" cx="21.5" cy="21.5" r="21.5"></circle></g><path d="M30.7390421,26.798379 L27.9911748,23.5849113 C27.4438506,22.9474897 26.537471,22.9668562 25.9710796,23.6293825 L24.5866923,25.2478021 C24.4992287,25.1914359 24.4086981,25.1325593 24.3135157,25.0700963 C23.4392896,24.5036853 22.2427622,23.7273508 20.983666,22.2540009 C19.7208381,20.7775428 19.0562994,19.3762793 18.5704194,18.3533803 C18.5191477,18.2450115 18.470023,18.1405279 18.4215117,18.0413044 L19.3506389,16.9564803 L19.8074326,16.4216894 C20.374693,15.7582067 20.3903352,14.6986667 19.8442889,14.0593922 L17.0964216,10.8455659 C16.5503753,10.207188 15.6435868,10.2265545 15.0763264,10.8900371 L14.3018832,11.8008016 L14.3230462,11.8253684 C14.063365,12.2128184 13.8463676,12.6596829 13.6848847,13.1415745 C13.536028,13.6002742 13.4433504,14.0379934 13.4009733,14.4766093 C13.0381352,17.9939042 14.4127078,21.2084479 18.1431211,25.5705176 C23.2996854,31.5997221 27.4551989,31.1442502 27.6344709,31.1220146 C28.024913,31.0674417 28.3990993,30.9583555 28.7793688,30.7856707 C29.1879067,30.5990588 29.569812,30.3456801 29.9009567,30.0426897 L29.9178768,30.060263 L30.7024414,29.1619314 C31.2685261,28.4985683 31.2848328,27.4386697 30.7390421,26.798379 Z" id="Path" fill="#FFFFFF" fill-rule="nonzero"></path></g> </g></g></svg></span>
                </a>}
                <div className="pf threeDotIcon zIn"> 
                {self.props.resCode && self.props.resCode != 204 && <span className="poa nr11" onClick={()=>{this.showThreeDotList()}}>
                {threeDotIcon}
                </span>}
                {this.state.showList ? this.createThreeDotList() : ''}
                </div>
                {this.c_name ?
                  <Link onClick={() => { window.removeEventListener("scroll", self.handleScrollDetail); document.removeEventListener("onMessageEvent", self.onMessageRecieved); document.removeEventListener("XmppJsloaded", self.connectChatUser); }} to={{ pathname: '/messages/contactdetail/', state: {country_code:contactInfo && contactInfo.result && contactInfo.result.contact_ph_country,rcv_num: contactInfo && contactInfo.result && contactInfo.result.contacts_mobile1, glusrid: this.glid, contactglid: this.contact_glid, flag: this.props.location.state ? this.props.location.state.flag : '', user: this.state.userType, name: (this.props.location.state && this.props.location.state.name) ? this.props.location.state.name : '', rating_val: this.state.rating_val, city: this.c_city, company: this.c_name, pincode: contactInfo&& contactInfo.result && contactInfo.result.contact_pincode, is_txn_initiator: (this.props.location.state && this.props.location.state.is_txn_initiator) ? this.props.location.state.is_txn_initiator : 0, queryId: (this.state.reply.details['queryid'] ? this.state.reply.details['queryid'] : '1'), mcatId: this.props.last_mcat_id ? this.props.last_mcat_id : '', mcatName: this.props.last_mcat_name ? this.props.last_mcat_name : '', prodName: this.props.last_transaction_prodName ? this.props.last_transaction_prodName : '', ratingDisplay: this.props.isRatingDisplay, queryType: (this.state.reply.details['q_type'] ? this.state.reply.details['q_type'] : 'C'), ratingType : this.props.ratingType ? this.props.ratingType : '',modrefId: this.props.last_transaction_refid ? this.props.last_transaction_refid : this.props.last_transaction_id ? this.props.last_transaction_id : '', hotLeadUser: this.checkHotLead ,contactYear: (this.props.location && this.props.location.state && this.props.location.state.contact_year) ? this.props.location.state.contact_year : '',userStatus:this.findUserStatus(), getAutoMsg: this.getAutoMsg, fromSeller: this.state.fromSeller}}} className={`pf zIn w55 dtlHeader pdtb5 df flxcol justContCent h85 ${window.location.href.indexOf("TYPageLanding=2") > -1 && self.props.resCode == 204?'msgPEnone':''}`}>
                  <span className={this.c_name.length > 27 ? "fs15 dib w100 truncate fw clrb pdb3" : "fs15 dib pdb2 fw clrb pdb3 w100 truncate"}>{this.c_name}
                      {(contactInfo && typeof contactInfo.result != 'undefined' && contactInfo.result.is_fraud == 1) ? <span class="fr vam fraudWarning" onclick={() => { event.preventDefault(); self.showFraudAlert() }}></span> : ''}
                    </span>
                    <span className={this.c_city && this.c_city.length > 27 ? "fs12 truncate w80 db clrb pdb3" : "fs12 db clrb pdb3"}><svg class="mr5" viewBox="0 0 8 11" height="11" width="10" xmlns="http://www.w3.org/2000/svg"><path fill="#757575" fill-rule="nonzero" d="M4 0C1.794 0 0 1.817 0 4.05c0 .582.118 1.138.35 1.653 1 2.215 2.917 4.555 3.481 5.219a.222.222 0 0 0 .338 0c.563-.664 2.48-3.003 3.481-5.22A3.99 3.99 0 0 0 8 4.05C8 1.817 6.205 0 4 0zm0 6.153c-1.146 0-2.078-.943-2.078-2.103 0-1.16.932-2.104 2.078-2.104 1.145 0 2.078.944 2.078 2.104 0 1.16-.932 2.103-2.078 2.103z"></path></svg>{(this.c_city) ? this.c_city : country_name}
                      {(this.props.isDisplayRating && this.props.avgRatingFetched) ?
                        <span class="ml10 clr33 br10 pdl5 pdr5 pdt2 pdb2 bgf3 fw fs14"><i><svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 30 29" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="rating-popup-new" transform="translate(-160.000000, -95.000000)" fill="#F8B711" fill-rule="nonzero"><g id="star-(6)" transform="translate(160.000000, 95.000000)"><polygon id="Shape" points="30 11.0636133 19.1054883 10.3471289 15 0.0334570312 10.8945117 10.3471875 0 11.0636719 8.35886719 18.1494141 5.6165625 28.9118555 15 22.9812891 24.3834375 28.9118555 21.64125 18.1498828"/></g></g></g></svg></i> {this.props.avgRating}</span> : ''}
                    </span>
                    <span id="lastSeenDiv" className={lastSeen.length > 27 ? stropheConnected + " fs12 clra0 truncate" : stropheConnected + " fs12 clra0"}>{lastSeen}</span>
                    <span id="onlineStatus" className={stropheConnected + " fs12 clr5a dn fw"}>{this.state.typingStatus}<span class="onStatus greenDot dib fl mla mr5"></span></span>
                    <div className='fsi clr0aa fwn'>{this.responseRate ? this.responseRate : this.props.sellerResponseRate && this.props.sellerResponseRate[this.contact_glid] ? this.props.sellerResponseRate[this.contact_glid]['time_slab_message_new'] :''}</div>
                  </Link> 
                  :  (this.props.userPrivacy || this.countryName!='India') ?
                  <Link onClick={() => { window.removeEventListener("scroll", self.handleScrollDetail); document.removeEventListener("onMessageEvent", self.onMessageRecieved); document.removeEventListener("XmppJsloaded", self.connectChatUser); }} to={{ pathname: '/messages/contactdetail/', state: {country_code:contactInfo && contactInfo.result && contactInfo.result.contact_ph_country,rcv_num: contactInfo && contactInfo.result && contactInfo.result.contacts_mobile1, glusrid: this.glid, contactglid: this.contact_glid, flag: this.props.location.state ? this.props.location.state.flag : '', user: this.state.userType, name: (this.props.location.state && this.props.location.state.name) ? this.props.location.state.name : '', rating_val: this.state.rating_val, is_txn_initiator: (this.props.location.state && this.props.location.state.is_txn_initiator) ? this.props.location.state.is_txn_initiator : 0, queryId: (this.state.reply.details['queryid'] ? this.state.reply.details['queryid'] : '1'), mcatId: this.props.last_mcat_id ? this.props.last_mcat_id : '', mcatName: this.props.last_mcat_name ? this.props.last_mcat_name : '', prodName: this.props.last_transaction_prodName ? this.props.last_transaction_prodName : '', ratingDisplay: this.props.isRatingDisplay, queryType: (this.state.reply.details['q_type'] ? this.state.reply.details['q_type'] : 'C'), ratingType : this.props.ratingType ? this.props.ratingType : '',modrefId: this.props.last_transaction_refid ? this.props.last_transaction_refid : this.props.last_transaction_id ? this.props.last_transaction_id : '', hotLeadUser: this.checkHotLead ,contactYear: (this.props.location && this.props.location.state && this.props.location.state.contact_year) ? this.props.location.state.contact_year : '',userStatus:this.findUserStatus(),usrCountry:getCookieValByKey("ImeshVisitor","iso"), getAutoMsg: this.getAutoMsg, fromSeller: this.state.fromSeller } }} className="pf zIn w70 dtlHeader pdtb5 df flxcol justContCent h85"><span className={name && name.length > 27 ? "fs16 dib w80 truncate fw clrb pdb3" : "fs16 dib pdb2 fw clrb pdb3"} >{name}{(contactInfo && typeof contactInfo.result != 'undefined' && contactInfo.result.is_fraud == 1) ? <span class="fr vam fraudWarning" onclick={() => { event.preventDefault(); self.showFraudAlert() }}></span> : ''}</span>
                    <span className={this.c_city && this.c_city.length > 27 ? "fs12 truncate w80 db clrb pdb3" : "fs12 db clrb pdb3"}>
                      <svg class="mr5" viewBox="0 0 8 11" height="11" width="10" xmlns="http://www.w3.org/2000/svg"><path fill="#757575" fill-rule="nonzero" d="M4 0C1.794 0 0 1.817 0 4.05c0 .582.118 1.138.35 1.653 1 2.215 2.917 4.555 3.481 5.219a.222.222 0 0 0 .338 0c.563-.664 2.48-3.003 3.481-5.22A3.99 3.99 0 0 0 8 4.05C8 1.817 6.205 0 4 0zm0 6.153c-1.146 0-2.078-.943-2.078-2.103 0-1.16.932-2.104 2.078-2.104 1.145 0 2.078.944 2.078 2.104 0 1.16-.932 2.103-2.078 2.103z"></path></svg>{(this.c_city) ? this.c_city : country_name}
                      {(this.props.isDisplayRating && this.props.avgRatingFetched) ?
                        <span class="ml10 clr33 br10 pdl5 pdr5 pdt2 pdb2 bgf3 fw fs14"><i><svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 30 29" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="rating-popup-new" transform="translate(-160.000000, -95.000000)" fill="#F8B711" fill-rule="nonzero"><g id="star-(6)" transform="translate(160.000000, 95.000000)"><polygon id="Shape" points="30 11.0636133 19.1054883 10.3471289 15 0.0334570312 10.8945117 10.3471875 0 11.0636719 8.35886719 18.1494141 5.6165625 28.9118555 15 22.9812891 24.3834375 28.9118555 21.64125 18.1498828"/></g></g></g></svg></i> {this.props.avgRating}</span> : ''}
                    </span>
                    <span id="lastSeenDiv" className={lastSeen && lastSeen.length > 27 ? stropheConnected + " fs12 clra0 truncate" : "fs12 clra0"}>{lastSeen}</span><span id="onlineStatus" className={stropheConnected + " fs12 clr5a dn fw"}>{this.state.typingStatus}<span class="onStatus greenDot mla dib fl mr5 mt4"></span></span></Link> : ''
                }
                </div>
              </React.Fragment>
              <div id="msgContainer" className={document.getElementById('listing_banner_msg') ? "paidsellerdetail por msgMc crx pdb150 bgf4" : (!this.state.hrzntlTemp) ? this.rcv_num && this.rcv_num !='' && !self.state.hrzntlTemp && !self.props.isFetchingmsgdetail  ? 'pdb237 mh90vh ht100 por msgMc bgf4': 'pdb192  mh90vh ht100 por msgMc bgf4':this.state.convRate&&this.state.hrzntlTemp?'pdb109 mh90vh ht100 por zIn bgf4':'pdb109 mh90vh ht100 por msgMc bgf4'}>
                <div id='loaderConversation' >
                  <div className='dt w100 mh90vh'><div className='vam dtc tc'><div className='loader ma'></div></div></div>
                </div>
                <ul id="msgDiv" className={"eq pdlr15 crx pdt10 pdb5 "+ThankYouMsg}>
                  {dummyMsgSearch}
                  {this.isOnetapNew && !this.props.isFetchingmsgdetail ?contactSellerStrip:''}
                  {
                    res && res.length && res.length > 0 ? replies.map((item, index) => {
                      return <div demo={index} key={item.message_id} className={index === 0 ? 'mt90' : ''}>
                        {item.message}
                      </div>
                    }) : ''
                  }
                  {isqMessages}
                  {this.isOnetapNew && this.state.showOneTapIsq && !this.customDescription ? this.isqBoxAb ?oneTapUI2:oneTapUI:''}
                  {(self.state.ratingFormMail && self.isEditRate&&!self.state.postCallRating) ? <self.state.ratingFormMail rating_val={getQueryStringValue("starRating") ? getQueryStringValue("starRating")  : this.state.rating_val} mcatId = {this.props.last_mcat_id ? this.props.last_mcat_id : '' } mcatName= {this.props.last_mcat_name ? this.props.last_mcat_name : ''} prodName= {this.props.last_transaction_prodName ? this.props.last_transaction_prodName : ''} ratingType={this.props.ratingType} seller_id={this.contact_glid} buyer_id={this.glid} modrefId={this.props.last_transaction_refid ? this.props.last_transaction_refid : this.props.last_transaction_id ? this.props.last_transaction_id : ''} hideFeedback={this.hideFeedback} showFeedback={this.showFeedback} isMail={self.isEditRate} pageName={'Messages'} company={(this.c_name && this.c_name != '') ? this.c_name : (name && name!='') ? name :'Indiamart User'}postCallRatingForm={this.state.postCallRating} askForReview={this.askForReview} webviewContent={this.webviewContent}/>: ''}
                  {(showRatingFlag) ? (self.state.feedbackForm) ? <self.state.feedbackForm mcatId = {this.props.last_mcat_id ? this.props.last_mcat_id : '' } mcatName= {this.props.last_mcat_name ? this.props.last_mcat_name : ''} prodName= {this.props.last_transaction_prodName ? this.props.last_transaction_prodName : ''} seller_id={this.contact_glid} buyer_id={this.glid} modrefId={this.props.last_transaction_refid ? this.props.last_transaction_refid : this.props.last_transaction_id ? this.props.last_transaction_id : ''} ratingType={this.props.ratingType} pageName={'conversation'} company={(this.c_name && this.c_name != '') ? this.c_name : (name && name!='') ? name :'Indiamart User'} showFeedback={this.showFeedback} hideFeedback={this.hideFeedback}/> : '' : ''}
                </ul>
                {(this.state.showStrip === true) ? <div class={"por wr pd10 fs12 w70 ma tc lh15 clr393 bgfff4 mt5 "+ThankYouMsg2}>Your requirement has been sent to the seller. To get faster response, you can directly call the seller or send message using text box below.</div> : ''}
              </div>
              <div id="imgdiv"></div>
              <div className={(!this.state.hrzntlTemp) ? `pf w100 z9999 msgCbtn bgw brdxtl12 ${ThankYouMsg?'b5':'msgb0'}` : `pf w100 z9999 msgCbtn bgw ${ThankYouMsg?'b5':'msgb0'}`} id="msgCbtn">
                {this.state.userType == 'Seller-Paid' ? <div id='listing_banner_msg' style="margin:-10px" className="pr10 pl10 pdb10 bgf1">
                  <div className="mesagBG por pdt20 pdb10">
                    <figure style={styles.imageCss().mesagMobIcn} className="dib poa tp0 lft0"></figure>
                    <div className="pdl130 clrw fs4vw pdt10 lh20 pdb10">
                      <div className="pdt5 pdb5">
                        Reply instantly to this buyer
                </div>
                      {(navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("iPod") != -1 || navigator.userAgent.indexOf("iPad") != -1) ?
                        <div className="dib bgw fw clr4a bxrd20 bxsd4 tc mt10 mb10 fs13 appBtn" onClick={() => { bannerDeepLinking('Message_Conversation_Banner', '', 'https://m.indiamart.com/messages/contactglid=' + this.contact_glid + '&contactname=' + encodeURIComponent(name) + '&contactnumber=' + this.rcv_num + '&contactid=' + this.contact_glid), eventTracking('Messages', 'App_banner', 'Paid_Seller_Banner') }}>Open in App</div> :
                        <div className="dib bgw fw clr4a bxrd20 bxsd4 tc mt10 mb10 fs13 appBtn" onClick={() => { bannerDeepLinking('Message_Conversation_Banner', '', 'https://m.indiamart.com/messages/conversation/?sup_glid=' + supplier_id), eventTracking('Messages', 'App_banner', 'Paid_Seller_Banner') }}>Open in App</div>
                      }
                    </div>
                  </div>
                </div> :
                  <React.Fragment>
                    {this.showTemplates && !this.state.hrzntlTemp && <div className='ht45'>
                      {(this.rcv_num && this.rcv_num != '+91' && !self.state.hrzntlTemp ? <a onClick={(e) => { !this.props.singleClickUpdate && this.isOnetapNew && this.generateEnquiry('3', true); this.props.location.state && this.props.location.state.unreadMessages ? gaTrack.trackEvent(['Messages', 'Call-Conversation-Templates-UnreadFilter' + (this.customDescription ? '/Messenger_Widget' : ''), this.state.userType, 0, true]) : gaTrack.trackEvent(["Messages", 'Call-Conversation-Templates-' + this.enqActionTrack + this.trackVal + (this.customDescription ? '/Messenger_Widget' : ''), this.state.userType + this.enqLabelTrack, 0, true, this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB', 'CALL-BACK-NOTIFICATION' + `${ThankYouMsg ? this.companyTrack ? '-MESSAGE-COMPANY' : '-MESSAGE-SEARCH' : ''}` + this.enqLabelTrack + (this.customDescription ? '/Messenger_Widget' : ''), e, 'Message_Center_Message Detail_Buyer-Vertical Template_WebView', '-Templates-Widget') }} href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb"><div class="fs12 fw bxrd20 clrw tc truncate call-pos poa  mb5 bgmim mt25 w100px fr bxsh33">{callNowIconOneTap}<span style="float:left; margin:8px 0; margin-left: -2px; ">Call Now</span></div></a> : '')}

                      {!this.state.hrzntlTemp && !this.props.isFetchingmsgdetail ? <span onClick={() => { this.realignTemp(), gaTrack.trackEvent(['Messages', 'Closed_Suggestion_Conversation', this.state.userType, 0, true]) }} class="hw18 bxrd10  fr mr10 mt10 ta bgcls"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 8 8" ><g fill="#ffffff" fill-rule="nonzero"><path stroke="#ffffff" stroke-width="1" d="M7.905.095a.323.323 0 0 0-.457 0L.095 7.448a.323.323 0 1 0 .457.457L7.905.552a.323.323 0 0 0 0-.457z"></path><path stroke="#ffffff" stroke-width="1" d="M7.905 7.448L.552.095a.323.323 0 1 0-.457.457l7.353 7.353a.322.322 0 0 0 .457 0 .323.323 0 0 0 0-.457z"></path></g></svg></span> : ''}
                    </div>}
                    {this.showTemplates && <div class={tempWrapCls} id="tempDiv">
                     {
                        (this.state.randomTemp.length != 0) ?
                          this.state.randomTemp.map(function (query, key) {
                            return <div className={tempCls}><div className="msgTemplate fs13 bxrd20 clr008 tc fw truncate" onClick={(e) => { !self.props.singleClickUpdate && self.isOnetapNew && self.generateEnquiry('3',true);self.sendmsgtemplate('t' + (key + 1), query.key,query.value,e,query.is_editable,query.temp_flag,ThankYouMsg); self.setState({smsLanding: false})} } ref={(dom) => { self && dom ? self.setRef(dom, "t" + (key + 1)) : ''; }}>{query.key}<span className="dn" id={"t" + (key + 1)}>{query.value}</span></div></div>
                          }) : (this.state.loaderTemp.length != 0) ? this.state.loaderTemp.map(function (query, key) {
                            return <div className={tempCls}><div className="msgTemplate dLoad tc ma bxrd20 bgw">
                              <div class="b1 bgmim"></div><div class="b2 bgmim"></div><div class="b3 bgmim"></div></div></div>
                          }) : ''}

                    </div>}
                    {this.state.showReplyBox?<div className="por pdr50 bgw pdrply" >
                      <form className="frm" id="reply-form" onSubmit={this.handleSubmit}>
                        <textarea placeholder="Write a message" rows="1" maxlength="3500" class="msgreply slBg mspd w100 fs16 ffa brdr24 overscrollMsg" onPaste={()=>{this.setState({templateCode:8})}} id="replybox" ref={(dom) => { self && dom ? self.setRef(dom, "replybox") : '' }} name="desc" onChange={this.handleChange} onClick={(e)=>{this.trackFocusEvent}} onFocus={this.handleFocus} autoFocus={false}></textarea>
                        <input type="hidden" name="SUBJECT" value={this.state['subject']} />
                        <input type="hidden" name="Query_Type" value={this.state['q_type']} />
                        <input type="hidden" name="query_id" value={this.state['query_id']} />
                          {this.rcv_num && this.rcv_num != '+91' && <a className={"poa tp10 brdr50 tp4 r0 "+(this.state.isTextBoxEmpty && !(this.params && this.params.reply_txt) ? "" : "dn")} id="msgCall" href={(this.rcv_num) ? 'tel:' + this.rcv_num : ''} key="mb">
                          <span onClick={(e) => {!this.props.singleClickUpdate && this.isOnetapNew && this.generateEnquiry('3',true);gaTrack.trackEvent(['Messages', 'CALL-BACK-NOTIFICATION-FOOTER'+this.enqActionTrack+this.trackVal+(this.customDescription?'/Messenger_Widget' : ''), this.state.userType+this.enqLabelTrack, 0, true,this.loginType + "-" + this.source]); this.clickToCall(this.rcv_num, this.contact_glid, seller_number_type, 'IMOB','MSG-CONVERSATION-PAGE'+this.enqLabelTrack,e,'Message_Center_Bottom_Call_Cta_WebView','-Reply-box'+(this.customDescription?'-  Messenger_Widget' : '')); this.setState({smsLanding: false})}} >{orderCallIcon}</span>
                        </a>}
                        <input type="submit" style={styles.imageCss().bgMsc} className={"msgCbtn1 sndIcnPos poa mWh50 fs0 tp4 brdr50 bgmim "+(this.state.isTextBoxEmpty && !(this.params && this.params.reply_txt) ? "dn" : "")} id="sbmtbtn" name="send" value="" onClick={() => {!this.props.singleClickUpdate && this.isOnetapNew && this.generateEnquiry('3',true);}}/>

                      </form>
                      {(this.state.userType != 'Seller-Paid' && 'webkitSpeechRecognition' in window) ? <svg onclick={self.mountVoiceVernacular} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16.44" width="20" height="20" id="vSrIco" class="poa vSrhIcon voiceIn voiceIconMsg"><path class="vSh1" d="M5,11.71a2.94,2.94,0,0,1-2.19-.92A2.93,2.93,0,0,1,1.9,8.6V3.11A3,3,0,0,1,2.81.91,3,3,0,0,1,5,0,3,3,0,0,1,7.19.91a3,3,0,0,1,.91,2.2V8.6a2.93,2.93,0,0,1-.91,2.19A2.94,2.94,0,0,1,5,11.71Z" /><path class="vSh2" d="M2.07,16.44a.28.28,0,0,1-.22-.1.34.34,0,0,1,0-.46.28.28,0,0,1,.22-.1H4.69V13.91l-.25,0a4.77,4.77,0,0,1-3.16-1.75A5.45,5.45,0,0,1,0,8.54V7.28a.32.32,0,0,1,.09-.23A.28.28,0,0,1,.31,7a.26.26,0,0,1,.21.1.32.32,0,0,1,.09.23V8.54A4.72,4.72,0,0,0,1.9,11.87a4.15,4.15,0,0,0,6.2,0A4.72,4.72,0,0,0,9.39,8.54V7.28a.32.32,0,0,1,.09-.23A.26.26,0,0,1,9.69,7a.28.28,0,0,1,.22.1.32.32,0,0,1,.09.23V8.54a5.45,5.45,0,0,1-1.28,3.59,4.77,4.77,0,0,1-3.16,1.75l-.25,0v1.87H7.93a.28.28,0,0,1,.22.1.34.34,0,0,1,0,.46.28.28,0,0,1-.22.1Z" /></svg> : ''}
                      {(self.state.VoiceHTML) ? <self.state.VoiceHTML page='Message' closeVoice={this.closeVoice}/> : ''}
                      <span className="msgSeparator"></span>
                      <label id="fileIcon" style={(/(android)/i.test(navigator.userAgent) && navigator.userAgent.indexOf("Firefox")) < 0 ? "right: 105px" : ''} className="attIcon poa zIn">
                        {attachIcon}
                        <input type="file" id="image" name="IMAGE" accept="image/x-png,image/jpeg,image/gif,.doc,.docx,.ppt, .pptx,.txt,.pdf, .xlsx, .xls, .csv" required="true" onChange={this.handleselectedFile} onClick={() => gaTrack.trackEvent(["Messages", "Attachment-btn-click", "", 0, true,this.loginType + "-" + this.source])} />
                      </label>
                      {(/(android)/i.test(navigator.userAgent) && navigator.userAgent.indexOf("Firefox") < 0 ) ? <label id="cameraIcon" style="right: 81px" className="attIcon zIn poa">
                       {cameraIcon}
                        <input type="file" style="visibility: hidden; width:0px" id="image" name="IMAGE" accept="image/x-png,image/jpeg,image/" required="true" onChange={this.handleselectedFile} onClick={() => this.props.location.state && this.props.location.state.unreadMessages ? gaTrack.trackEvent(["Messages", "Gallery-btn-click-UnreadFilter", this.state.userType, 0, true,this.loginType + "-" + this.source]) : gaTrack.trackEvent(["Messages", "Gallery-btn-click", this.state.userType, 0, true,this.loginType + "-" + this.source])} />
                    </label>: ''}
                    </div>:''}
                    <div id="xsserr" class="dn fs14 ml15 pdb5"></div>
                  </React.Fragment>
                }
                {ThankYouMsg && !this.oddGlid ?this.installAppFooter(name,this.rcv_num,supplier_id):''}
                {(ThankYouMsg || this.isOnetapNew || this.smsLanding) && this.state.showAppBanner && !this.webviewContent && <AppInstallBanner pageName={'Messages'} userFlow={'Messages-Full-Login'} source={ThankYouMsg ? 'ThankYou_Footer_New' : this.isOnetapNew ? 'OneTap' : 'SMS'} prodName = {productName}/>}
              </div>
            </div>}
            {self.props.isfetchingOrderDetail&&<div className='pf l50 tMsg20 z9'>
              <div className='dt w100 mh400'><div className='vam dtc tc'><div className='loader ma'></div></div></div></div>}
          {this.props.c2cMsg && <div><div className="blanketNI pf w100 h100vh z99999" onClick={this.resetC2cMsg}></div>
            <div className='postCallWrap bgw pf tc lh22 pd20'><div className='clrb'><p className='fw fs16'>Please recheck the number</p></div></div>
          </div>} 
        </div>
        )
    }
  } 
}

export default messageDetail;

