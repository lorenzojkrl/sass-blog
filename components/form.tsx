import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Group, NumberInput, Textarea } from "@mantine/core";
import { useRouter } from "next/router";
import { Chip, Text } from '@mantine/core';

const textareaStyles = {
    input: {
        '&:focus': {
            borderColor: '#0B7285', //cyan.9
        },
    },
};

const chipStyles = {
    label: {
        borderColor: '#CED4DA', //gray.4
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#CED4DA', //gray.4
        }
    }
}

const chips = [{ value: 'G_formal' }, { value: 'G_conversational' }, { value: 'G_technical' }, { value: 'G_engaging' }, { value: 'G_persuasive' }]

const Form = ({
    format,
    setGenerating
}:
    {
        format: boolean,
        setGenerating: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
    const [topic, setTopic] = useState<string>("");
    const [style, setStyle] = useState("");
    const [keywords, setKeywords] = useState("");
    const [length, setLength] = useState<number | "">(500);
    const { t, lang } = useTranslation("common");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGenerating(true);

        let url = `/api/${format ? 'generatePost' : 'generateNewsletter'}`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ topic, keywords, length, locale: lang, style }),
            });
            const json = await response.json();

            if (json?.postId) {
                router.push(`/post/${json.postId}`);
            }
        } catch (e) {
            setGenerating(false);
        }
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

            <div className="mt-8">
                <Text>{t("G_styles")}</Text>
                <Chip.Group multiple={false} value={style} onChange={setStyle}>
                    <Group position="apart">
                        {
                            chips.map((chip) => (
                                <Chip
                                    key={chip.value}
                                    value={t(`${chip.value}`)}
                                    variant="filled"
                                    color="cyan"
                                    size="sm"
                                    radius="sm"
                                    styles={chipStyles}
                                >
                                    {t(`${chip.value}`)}
                                </Chip>

                            ))
                        }
                    </Group>
                </Chip.Group>
            </div>
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
