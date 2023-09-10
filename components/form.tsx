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
        },
        'data-checked="true"': {
            color: 'red'
        }

    }
}

const Form = ({
    format,
    setGenerating
}:
    {
        format: boolean,
        setGenerating: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
    const [topic, setTopic] = useState<string>("");
    const [chip, setChip] = useState('react');
    const [keywords, setKeywords] = useState("");
    const [length, setLength] = useState<number | "">(500);
    const { t, lang } = useTranslation("common");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGenerating(true);

        console.log('e', e, 'format', format);
        let url = `/api/${format ? 'generatePost' : 'generateNesletter'}`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ topic, keywords, length, locale: lang }),
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
                <Text>Style</Text>
                <Chip.Group multiple={false} value={chip} onChange={setChip}>
                    <Group>
                        <Chip value="react" variant="filled" color="cyan" size="md" radius="sm" styles={chipStyles}>React</Chip>
                        <Chip value="ng" variant="filled" color="cyan" size="md" radius="sm" styles={chipStyles}>Angular</Chip>
                        <Chip value="svelte" variant="filled" color="cyan" size="md" radius="sm" styles={chipStyles}>Svelte</Chip>
                        <Chip value="vue" variant="filled" color="cyan" size="md" radius="sm" styles={chipStyles}>Vue</Chip>
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
