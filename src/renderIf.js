export const renderIf = (condition, trueComponent, falseComponent) => {
	if (condition) {
		return trueComponent;
	} else {
		return falseComponent;
	}
}