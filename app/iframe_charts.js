const IframeChart = ({ src }) => {
    console.log("IframeChart component mounted with datapath:", src);
    return (
        <div style={{ height: '900px', width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', height: '100%' }}>
                <iframe
                    src={src}
                    style={{ border: 'none', width: '100%', height: '100%' }}
                    title="Iframe Chart"
                />
            </div>
        </div>
    );
};

export { IframeChart };