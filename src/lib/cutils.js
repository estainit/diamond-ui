
export const mapBlockTypeToColor = (bType) =>{
    let theMap = {
        "Genesis": "#2fe329",
        "Coinbase": "#f7a705",
    };

    if (theMap[bType] != "")
    {return theMap[bType];}
    return "#ffffff";
}

export const hash6c = (s) =>{
    return s.substring(0, 6);
}
