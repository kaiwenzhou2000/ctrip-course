import React from 'react';
import style from './index.less';


export default () => {
    return (
        <>
            样式使用less编写
            <div className={style.parent}>
                父元素
                <div className={style.children}>子元素</div>
            </div>
        </>
        
    )
}