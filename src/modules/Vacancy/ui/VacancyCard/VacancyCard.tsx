import {Button, Card, Group, Stack, Text} from "@mantine/core";

interface VacancyCardProps {
  vacancyName: string
  salary: number
  experience: string
  area: string
  employer: string
  format: string
}

export const VacancyCard = (
  {
    vacancyName,
    salary,
    experience,
    area,
    format,
    employer
  }: VacancyCardProps) => {
  return (
    <Card>
      <Stack gap={16}>
        <Stack gap={8}>
          <Text c="#364FC7" fw={600}>{vacancyName}</Text>
          <Group>
            <Text>{salary}</Text>
            <Text c="#0F0F1080">{experience}</Text>
          </Group>
        </Stack>
        <Stack gap={8}>
          <Text>{employer}</Text>
          <Text>{format}</Text>
          <Text>{area}</Text>
        </Stack>
        <Group>
          <Button bg="black">Смотреть вакансию</Button>
          <Button c="black" bg="#0F0F101A">Откликнуться</Button>
        </Group>
      </Stack>
    </Card>
  );
};
