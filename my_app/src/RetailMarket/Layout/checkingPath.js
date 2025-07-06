import { useSelector } from "react-redux"

export const useCheckingPath = (path) => {
    const tabs = useSelector(store => store.tab.tabs);
    return tabs;
}