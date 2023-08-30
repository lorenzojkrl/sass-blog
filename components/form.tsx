import useTranslation from "next-translate/useTranslation";
import { NumberInput, Textarea } from "@mantine/core";

const Form = ({
    topic,
    setTopic, keywords,
    setKeywords,
    length,
    setLength,
    handleSubmit,
    format
}:
    {
        topic: string,
        setTopic,
        keywords: string,
        setKeywords, length: number | "",
        setLength,
        handleSubmit,
        format: boolean
    }) => {
    const { t } = useTranslation("common");

    const textareaStyles = {
        input: {
            borderColor: 'gray.4',
            '&:focus': {
                borderColor: '#0B7285', //cyan.9
            },
        },
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-screen-sm pb-4 rounded-md shadow-xlborder border-slate-200 shadow-slate-200"
        >
            <Textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t(format ? "topicPlaceholder" : "shortContentTopicPlaceholder")}
                label={t("G_Topic")}
                labelProps={{ size: 'md' }}
                styles={textareaStyles}
                maxLength={250}
                minRows={3}
                maxRows={5}
                autosize
                className="mt-8"
            />

            <Textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                label={t(format ? "keywordsLabel" : "shortContentKWPlaceholder")}
                labelProps={{ size: 'md' }}
                styles={textareaStyles}
                placeholder={t("keywordsPlaceholder")}
                maxLength={80}
                minRows={2}
                maxRows={2}
                className="mt-8"
            />

            <NumberInput
                defaultValue={500}
                label={t(format ? "wordsNumberLabel" : "wordsCharsLabel")}
                labelProps={{ size: 'md' }}
                styles={textareaStyles}
                withAsterisk
                hideControls
                max={2000}
                min={200}
                value={length}
                onChange={setLength}
                className="my-8"
            />


            <button
                type="submit"
                className="generate-btn"
                disabled={!topic.trim() || !keywords.trim()}
            >
                {t("G_write")}
            </button>
        </form>
    );
};

export default Form;
