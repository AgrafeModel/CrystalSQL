import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
export default function TextWidget({ widget }) {
    return (
        <Card className="w-full h-full">
            <CardHeader>{widget.title}</CardHeader>
            <CardBody className="h-full w-full">{widget.content}</CardBody>
            <CardFooter>{widget.description}</CardFooter>
        </Card>
    );
};