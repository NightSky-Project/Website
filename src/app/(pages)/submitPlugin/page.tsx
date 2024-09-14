import React from 'react';

const SubmitPluginPage: React.FC = () => {
    return (
        <div>
            <h1>Submit a Plugin</h1>
            <form>
                <div>
                    <label htmlFor="pluginName">Plugin Name:</label>
                    <input type="text" id="pluginName" name="pluginName" required />
                </div>
                <div>
                    <label htmlFor="pluginDescription">Plugin Description:</label>
                    <textarea id="pluginDescription" name="pluginDescription" required></textarea>
                </div>
                <div>
                    <label htmlFor="pluginUrl">Plugin URL:</label>
                    <input type="url" id="pluginUrl" name="pluginUrl" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SubmitPluginPage;