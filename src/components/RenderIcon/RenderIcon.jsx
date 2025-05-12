import DocumentIcon from '../../assets/DocumentIcon';
import SpreadsheetsIcon from '../../assets/SpreadsheetsIcon';
import PresentationsIcon from '../../assets/PresentationsIcon';
import VideoIcon from '../../assets/VideoIcon';
import ImageIcon from '../../assets/ImageIcon';
import PdfIcon from '../../assets/PdfIcon';
import AudioIcon from '../../assets/AudioIcon';
import DefaultFile from '../../assets/DefaultFile';

function RenderIcon({ fileType }){
    switch(fileType){
        case 'docx': return <DocumentIcon/>;
        case 'excel': return <SpreadsheetsIcon/>;
        case 'ppt': return <PresentationsIcon/>;
        case 'video': return <VideoIcon/>;
        case 'img': return <ImageIcon/>;
        case 'pdf': return <PdfIcon/>;
        case 'audio': return <AudioIcon/>;
        default : return <DefaultFile/>;
    }
}

export default RenderIcon;