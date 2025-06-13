import {
  Container,
  Title,
  Grid,
  Card,
  Image,
  Text,
  Group,
  Button,
  Select,
} from "@mantine/core";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { prisma } from "~/utils/db.server";
import type { Product } from "@prisma/client";
import { useState } from "react";

export async function loader() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = [...new Set(products.map((product) => product.category))];

  return json({ products, categories });
}

export default function Products() {
  const { products, categories } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value || "");
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Recommended Products</Title>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Filter by category"
          clearable
          data={categories}
          style={{ width: 200 }}
        />
      </Group>

      <Grid>
        {filteredProducts.map((product: Product) => (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={product.imageUrl}
                  height={200}
                  alt={product.title}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{product.title}</Text>
              </Group>

              <Text size="sm" c="dimmed" mb="md">
                {product.description}
              </Text>

              <Button
                component="a"
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                variant="light"
              >
                View on Amazon
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
