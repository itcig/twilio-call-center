const updateClipboard = newClip => {
	navigator.clipboard.writeText(newClip)
		.then(result => {
			/* clipboard successfully set */
			return true;
		}, error => {
			/* clipboard write failed */
			return false;
		});
};

export const copyToClipboard = newClip => {
	/* Make sure the browser is able to write to the clipboard */
	navigator.permissions.query({name: 'clipboard-write'})
		.then(result => {
			if (result.state === 'granted' || result.state === 'prompt') {
				/* write to the clipboard now */
				updateClipboard(newClip);
			}
		});
};

export default copyToClipboard;