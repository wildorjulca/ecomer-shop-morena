const useToggleFilter = () => {

    const toggleFilter = (
        value: string,
        selected: string[],
        setSelected: React.Dispatch<
            React.SetStateAction<string[]>
        >
    ) => {

        const exists =
            selected.includes(value)

        if (exists) {

            setSelected(prev =>
                prev.filter(
                    item => item !== value
                )
            )

        } else {

            setSelected(prev => [
                ...prev,
                value
            ])

        }

    }

    return {
        toggleFilter
    }

}

export default useToggleFilter