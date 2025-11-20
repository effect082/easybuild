import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import VideoBlock from './VideoBlock';
import TextEditor from '../components/Editor/PropertyEditors/TextEditor';
import ImageEditor from '../components/Editor/PropertyEditors/ImageEditor';
import VideoEditor from '../components/Editor/PropertyEditors/VideoEditor';
import DateBlock from './DateBlock';
import DateEditor from '../components/Editor/PropertyEditors/DateEditor';
import MapBlock from './MapBlock';
import MapEditor from '../components/Editor/PropertyEditors/MapEditor';
import InputBlock from './InputBlock';
import InputEditor from '../components/Editor/PropertyEditors/InputEditor';
import BusinessInfoBlock from './BusinessInfoBlock';
import BusinessInfoEditor from '../components/Editor/PropertyEditors/BusinessInfoEditor';
import HeaderBlock from './HeaderBlock';
import HeaderEditor from '../components/Editor/PropertyEditors/HeaderEditor';
import SocialMediaBlock from './SocialMediaBlock';
import SocialMediaEditor from '../components/Editor/PropertyEditors/SocialMediaEditor';

const BlockRegistry = {
    text: {
        view: TextBlock,
        editor: TextEditor,
        label: '텍스트',
    },
    image: {
        view: ImageBlock,
        editor: ImageEditor,
        label: '이미지',
    },
    video: {
        view: VideoBlock,
        editor: VideoEditor,
        label: '영상',
    },
    date: {
        view: DateBlock,
        editor: DateEditor,
        label: '일정',
    },
    map: {
        view: MapBlock,
        editor: MapEditor,
        label: '지도',
    },
    input: {
        view: InputBlock,
        editor: InputEditor,
        label: '입력폼',
    },
    businessInfo: {
        view: BusinessInfoBlock,
        editor: BusinessInfoEditor,
        label: '사업안내',
    },
    header: {
        view: HeaderBlock,
        editor: HeaderEditor,
        label: '헤드(제목)',
    },
    socialMedia: {
        view: SocialMediaBlock,
        editor: SocialMediaEditor,
        label: '소셜미디어',
    },
};

export default BlockRegistry;

