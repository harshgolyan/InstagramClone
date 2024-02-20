import React from "react";
import { HeartIcon,ShareIcon,ChatAltIcon,HomeIcon,SearchIcon,TemplateIcon} from '@heroicons/react/outline';
import { useNavigate } from "react-router-dom";

const LeftNavbar = () =>{
    const navigate = useNavigate()

    const onclickhandler = () => {
        navigate('/createpost')

    }
    return<>
        <div className="flex flex-col">
            <div className="flex flex-col p-10">
            <HomeIcon className="h-10 w-10 text-black-500 m-3" />
            <HeartIcon className="h-10 w-10 text-black-500 m-3 mt-5" />
            <ChatAltIcon className="h-10 w-10 text-black-500 m-3" />
            <ShareIcon className="h-10 w-10 text-black-500 m-3" />
            <SearchIcon className="h-10 w-10 text-black-500 m-3" />
            <TemplateIcon className="h-10 w-10 text-black-500 m-3" onClick={onclickhandler} />
            </div>
        </div>
    </>
}
export default LeftNavbar;