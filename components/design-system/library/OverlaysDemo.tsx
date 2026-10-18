"use client";

import { useState } from "react";
import { DsCard } from "@/components/design-system/DsCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Menu } from "@/components/ui/Menu";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/hooks/useToast";
import { SAMPLE_MENU_LABELS } from "@/lib/design-system/constants";
import { type ModalVariant } from "@/types/modal";

export function OverlaysDemo() {
  const [openModal, setOpenModal] = useState<ModalVariant | null>(null);
  const toast = useToast();
  const close = () => setOpenModal(null);
  const menuItems = SAMPLE_MENU_LABELS.map((item) => ({
    ...item,
    onSelect: () => toast.success(`${item.label} selected`),
  }));

  return (
    <div className="grid grid-cols-1 gap-4 nav:grid-cols-3">
      <DsCard title="Toast · 1.8">
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="secondary"
            onClick={() => toast.success("Post published")}
          >
            Success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.error("Couldn't save your like. It was reverted.")
            }
          >
            Error
          </Button>
        </div>
      </DsCard>
      <DsCard title="Modal & sheet · 1.9">
        <div className="flex flex-wrap gap-2.5">
          <Button variant="secondary" onClick={() => setOpenModal("modal")}>
            Open modal
          </Button>
          <Button variant="secondary" onClick={() => setOpenModal("sheet")}>
            Open sheet
          </Button>
        </div>
      </DsCard>
      <DsCard title="Menu · 1.10">
        <Menu
          label="Post options"
          trigger={<Icon name="more" />}
          items={menuItems}
          align="start"
        />
      </DsCard>

      <Modal
        open={openModal === "modal"}
        onClose={close}
        title="New post"
        footer={
          <>
            <span className="flex-1" />
            <Button pill onClick={close}>
              Post
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-3 p-4.5">
          <Badge variant="accent" className="self-start">
            Everyone
          </Badge>
          <Textarea
            aria-label="Post text"
            placeholder="What's happening in the square?"
            rows={4}
          />
        </div>
      </Modal>
      <Modal
        open={openModal === "sheet"}
        onClose={close}
        title="Simulation"
        variant="sheet"
      >
        <p className="px-4.5 pb-8 text-body-sm text-ag-text-secondary">
          Bottom sheet for mobile. Press Escape or tap the backdrop to close.
        </p>
      </Modal>
    </div>
  );
}
