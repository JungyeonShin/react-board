import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor';
import { useEffect } from 'react';
import { useRef } from 'react';
import { objChnage } from '../util/common';

export const ToastEditor = ({
    body,
    setBody,
    enable
}) => {

    const editor = useRef();

    const onChangeGetHtml = () => {
        const data = editor.current.getInstance().getHTML();
        objChnage(data, "content", setBody);
        // setBody(data);

        // console.log("TEST :: ", editor.current.getInstance());
        // console.log("에디터 :: ", editor.current.getInstance().)
    }

    useEffect(() => {
        if (body?.content) {
            editor.current.getInstance().setHTML(body?.content);
        }
    }, [body?.content])

    return (
        <>
        <div className='mb-3'>
            <Editor
                toolbarItems={[
                    // 툴바 옵션 설정
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock']
                ]}
                height="300px"
                initialEditType='wysiwyg'
                previewStyle='vertical'
                ref={editor}
                onChange={onChangeGetHtml}
                usageStatistics={false}
                hideModeSwitch={true}
                language="ko-KR"
                plugins={[colorSyntax]}
            >

            </Editor>
        </div>
        </>
    );
};