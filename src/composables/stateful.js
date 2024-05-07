import { reactive } from 'vue';

const globalState = reactive({
    someObject: {},
    someBoolean: false
});

export const useStatefulComposable = () => {
    const localState = reactive({
        someObject: {},
        someBoolean: false
    });

    const updateValues = (objectValue, booleanValue) => {
        // Set the global state values
        globalState.someObject = objectValue;
        globalState.someBoolean = booleanValue;

        // Set the local state values
        localState.someObject = objectValue;
        localState.someBoolean = booleanValue;
    };

    return {
        globalState,
        localState,
        updateValues
    };
};