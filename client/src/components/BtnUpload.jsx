const BtnUpload = () => {
    return (
        <div className="w-12 h-12 border rounded-3xl overflow-hidden relative font-semibold ease-in-out bg-slate-300 btnUpload-add-btn hover:w-32 focus:outline-none">
            <div className="add-icon"></div>
            <div className="opacity-0 btn-text">Add Song</div>
        </div>
    );
}

export default BtnUpload;