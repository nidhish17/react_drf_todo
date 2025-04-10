import {createContext, useContext, useRef, useState} from "react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const TabsContext = createContext(null);


const Tabs = function ({children}) {

    const [tab, setTab] = useState("all");
    const [tabContent, setTabContent] = useState(null);

    const contextValue = {
        setTab,
        tab,
        tabContent,
        setTabContent
    }

    return (
        <TabsContext.Provider value={contextValue}>
            <div className="space-y-2 relative">
                {children}
            </div>
        </TabsContext.Provider>

    );
}

const TabList = function ({children}) {

    const tabRef = useRef();

    const handleScrollR = function () {
        tabRef.current.scrollLeft += 200;
    }

    const handleScrollL = function () {
        tabRef.current.scrollLeft -= 200;
    }

    return (
        <div ref={tabRef} className="flex flex-row gap-x-2 items-center overflow-x-hidden text-nowrap scroll-smooth scroll-m-0.5 bg-neutral-800 rounded px-2 py-1.5 snap-x">
            {children}
            <p onClick={handleScrollL} className="absolute flex items-center justify-center p-2.5 rounded-full border left-0 -translate-x-1/2 bg-zinc-600/90 cursor-pointer"><FaAngleLeft className="" /></p>
            <p onClick={handleScrollR} className="absolute flex items-center justify-center p-2.5 rounded-full border right-0 translate-x-1/2 bg-zinc-600/90 cursor-pointer"><FaAngleRight className="" /></p>
        </div>
    )
}

const TabLabel = function ({value, children, whenClicked, open=false}) {
    const {tab, setTab, setTabContent} = useContext(TabsContext);

    const handleLabelClick = function() {
        setTab(value);
        whenClicked?.();
    }

    return (
        <div onClick={handleLabelClick} className={`px-4 py-1.5 rounded ${tab === value && "bg-neutral-600"} cursor-pointer snap-start`}>
            {children}
        </div>
    )
}

const TabContent = function ({value, children, className}) {
    const {tab} = useContext(TabsContext);
    return (
        <div className={className}>
            {tab === value && children}
        </div>
    )
}

Tabs.Label = TabLabel;
Tabs.Content = TabContent;

// export const useTabContext = useContext(TabsContext);

export {TabList};
export default Tabs;